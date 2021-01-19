require('dotenv-defaults').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { UserInputError, AuthenticationError } = require('apollo-server');
const mongodb = require('mongodb');

const User = require('../../models/User');
const Farm = require('../../models/Farm');
const { validateRegisterInput, validateLoginInput } = require('../../util/validators');
const checkAuth = require('../../util/check-auth');
const { mongo } = require('mongoose');
const { resetApolloContext } = require('react-apollo');

function genToken(user)
{
    return jwt.sign({
        id: user.id,
        email: user.email,
        username: user.username
    }, process.env.SECRET_KEY, { expiresIn: '1h' });
}

module.exports = {
    Mutation: {
        async login(_, { username, passwordHash }){
            const { valid, errors } = validateLoginInput(username, passwordHash);
            if(!valid)
            {
                throw new UserInputError('Errors', { errors });
            }
            const user = await User.findOne({ username: username });
            if(!user)
            {
                errors.general = 'User not found';
                throw new UserInputError('User not found', { errors });
            }

            const match = await bcrypt.compare(passwordHash, user.passwordHash);
            if(!match)
            {
                errors.general = 'Wrong credentials';
                throw new UserInputError('Wrong credentials', { errors });
            }
            const token = genToken(user);
            return {
                ...user._doc,
                id: user._id,
                token
            }
        },

        async register(
            _, 
            { 
                registerInput: { username, email, passwordHash, confirmHash }
            }
        ){
            //Validate user data
            //console.log(username, email, passwordHash)
            const { valid, errors } = validateRegisterInput(username, email, passwordHash, confirmHash);
            if(!valid)
            {
                throw new UserInputError('Errors', { errors });
            }
            //User and email doesn't already exist
            const user = await User.findOne({ username: username });
            if(user){
                throw new UserInputError('Username is taken', {
                    errors: {
                        username: 'This username is taken'
                    }
                })
            }
            const mail = await User.findOne({ email: email });
            if(mail)
            {
                throw new UserInputError('Email already registered', {
                    errors: {
                        email: 'This email has already registered'
                    }
                })
            }

            //Create auth token
            passwordHash = await bcrypt.hash(passwordHash, 5);
            const newUser = new User({
                username,
                passwordHash,
                email,
                profile: "",
                farms: [],
                invitations: [],
                friends: [],
                createdAt: new Date().toISOString()
            });
            const res = await newUser.save();
            const token = genToken(res);

            return {
                ...res._doc,
                id: res._id,
                token
            };
        },

        async createPlant(_, {
                plantInput: { farmId, plantType, title, body, chunkCoordinates, plantCoordinates }
            }, context)
        {
            const user = checkAuth(context);
            try
            {
                let farm = await Farm.findById(farmId);
                if(!farm)
                {
                    throw new Error('Farm not found');
                }
                else if(!farm.members.find(mem => mem.username === user.username))
                {
                    throw new Error('Action not allowed');
                }
                else
                {
                    const plant = {
                        _id: new mongodb.ObjectID(),
                        plantType,
                        title,
                        body,
                        author: user.username,
                        chunkCoordinates,
                        plantCoordinates,
                        createdAt: new Date().toISOString()
                    }
                    farm.plants.push(plant);
                    const res = await farm.save();
                    console.log(res);
                    const plantIndex = farm.plants.findIndex(plt => plt._id === plant._id);
                    if(plantIndex !== -1)
                    {
                        context.pubsub.publish(`subscribe farm ${farmId}`, {
                            farm: {
                                mutation: 'CREATED_PLANT',
                                index: plantIndex,
                                plant: {
                                    id: plant._id,
                                    ...plant
                                }
                            }
                        });
                        return {
                            id: plant._id,
                            plantType,
                            title,
                            body,
                            author: plant.author,
                            chunkCoordinates,
                            plantCoordinates,
                            createdAt: plant.createdAt
                        };
                    }
                    else
                    {
                        throw new Error('Action failed');
                    }
                } 
            }
            catch(err)
            {
                throw new Error(err);
            }
        },

        async deletePlant(_, { farmId, plantId }, context)
        {
            const user = checkAuth(context);
            try{
                let farm = await Farm.findById(farmId);
                let dbUser = await User.findById(user.id);
                if(!farm)
                {
                    throw new Error("Farm not found");
                }
                if(!dbUser)
                {
                    throw new UserInputError("User not found");
                }
                console.log(plantId)
                console.log(farm.plants)
                let plantIndex = farm.plants.findIndex(plt => plt._id == plantId);
                if(plantIndex === -1)
                {
                    throw new Error("Plant not found");
                }
                let plant = farm.plants[plantIndex];
                if(plant.author !== user.username)
                {
                    throw new Error("Action not allowed")
                }
                farm.plants.splice(plantIndex, 1);
                await farm.save();
                context.pubsub.publish(`subscribe farm ${farmId}`, {
                    farm: {
                        mutation: 'DELETED_PLANT',
                        index: plantIndex,
                        plant: {
                            id: plant._id,
                            ...plant
                        }
                    }
                })
                return "Plant deleted successfully";

            }
            catch(err)
            {
                throw new Error(err);
            }
        },
        
        async createFarm(_, { farmName, farmType }, context)
        {
            console.log(farmType)
            const user = checkAuth(context);
            const date = new Date().toISOString();
            const newFarm = new Farm({
                farmName,
                farmType,
                invited: [],
                members: [
                    {
                        _id: user.id,
                        username: user.username,
                        email: user.email,
                        createdAt: date
                    }
                ],
                chunks: [
                    {
                        _id: new mongodb.ObjectId(),
                        coordinates: {
                            x: 0,
                            y: 0
                        },
                        createdAt: date
                    }
                ],
                plants: [
                    {
                        _id: new mongodb.ObjectId(),
                        plantType: 'Post',
                        title: 'Grow your first plant',
                        body: 'Press the button to grow your first plant!',
                        author: 'RDOGS',
                        chunkCoordinates:
                        {
                            x:0,
                            y:0
                        },
                        plantCoordinates:
                        {
                            x:0,
                            y:0
                        },
                        createdAt: date
                    }
                ],
                users: [user.id],
                createdAt: date
            });
            try{
                const res = await newFarm.save();
                let dbUser = await User.findById(user.id);
                dbUser.farms.push({
                    _id: res._id,
                    farmName: res.farmName,
                    farmType: res.farmType,
                    createdAt: res.createdAt
                });
                await dbUser.save();
                console.log("No error")
                let r = {
                    ...res._doc,
                    id: res._id
                }
                return r;
            }
            catch(err){
                throw new Error(err);
            }

        },
        async leaveFarm(_, { farmId }, context)
        {
            const user = checkAuth(context);
            try{
                await Farm.findByIdAndUpdate(
                    farmId,
                    {
                        $pull: 
                        { 
                            members: 
                            {
                                username: user.username
                            }
                        }
                    });
                const farm = await Farm.findById(farmId);
                if(!farm)
                {
                    throw new Error('Farm not found');
                }
                if(farm.members.length === 0)
                {
                    await farm.delete();
                    return 'No members left, farm deleted';
                }
                else if(!farm.members.find(mem => mem.username === user.username))
                {
                    return 'Farm left successfully';
                }
                else
                {
                    throw new Error('Action failed');
                }
            }
            catch(err)
            {
                throw new Error(err);
            }
        },
        async acceptInvitation(_, { friendName }, context)
        {
            const user = checkAuth(context);
            try {
                const date = new Date().toISOString();
                let friend = await User.findOne({username: friendName});
                let dbUser = await User.findById(user.id);
                if(!friend)
                {
                    throw new UserInputError('Friend user not found');
                }
                const invIndex = dbUser.invitations.findIndex(inv => inv.username === friendName);
                if(invIndex === -1)
                {
                    throw new UserInputError('Invitation not found');
                }
                dbUser.invitations.splice(invIndex, 1);
                friend.friends.push({
                    _id: dbUser._id,
                    username: dbUser.username,
                    email: dbUser.email,
                    createdAt: date
                });
                dbUser.friends.push({
                    _id: friend._id,
                    username: friend.username,
                    email: friend.email,
                    createdAt: date
                })
                await dbUser.save();
                await friend.save();
                return "Friend added successfully";
            }
            catch (err) {
                throw new Error(err);
            }
        },
        async declineInvitation(_, { friendName }, context)
        {
            const user = checkAuth(context);
            try {
                let dbUser = await User.findById(user.id);
                if(!dbUser)
                {
                    throw new UserInputError("User not found");
                }
                const invIndex = dbUser.invitations.findIndex(inv => inv.username === friendName);
                if(invIndex === -1)
                {
                    throw new Error("Invitation not found");
                }
                dbUser.invitations.splice(invIndex, 1);
                await dbUser.save();
                return "Invitation declined successfully";
            } catch (err) {
                throw new Error(err);
            }
        },
        async sendInvitation(_, { friendName }, context)
        {
            const user = checkAuth(context);
            try {
                let friend = await User.findOne({username: friendName});
                let dbUser = await User.findById(user.id);
                if(!friend)
                {
                    throw new UserInputError('User not found');
                }
                if(friendName === user.username)
                {
                    throw new UserInputError('You cannot be friends with yourself');
                }
                if(friend.invitations.find(inv => inv.username === friendName))
                {
                    throw new Error('Already invited');
                }
                if(friend.friends.find(fr => fr.username === user.username))
                {
                    throw new Error('Already friends');
                }
                const invIndex = dbUser.invitations.findIndex(inv => inv.username === friendName);
                if(invIndex !== -1)
                {
                    //accept
                    const date = new Date().toISOString();
                    friend.invitations.splice(invIndex, 1);
                    friend.friends.push({
                        _id: dbUser._id,
                        username: dbUser.username,
                        email: dbUser.email,
                        createdAt: date
                    });
                    dbUser.friends.push({
                        _id: friend._id,
                        username: friend.username,
                        email: friend.email,
                        createdAt: date
                    })
                    await dbUser.save();
                    await friend.save();
                    return "Friend added successfully";
                }
                else
                {    
                    const inv = {
                        _id: user.id,
                        username: user.username,
                        email: user.email,
                        createdAt: new Date().toISOString()
                    }
                    friend.invitations.push(inv);
                    await friend.save();
                    return "Friend Invitation sent successfully";
                }
            } catch (err) {
                throw new Error(err)
            }
        },
        async getFriends(_, __, context)
        {
            const user = checkAuth(context);
            try {
                const dbUser = await User.findById(user.id);
                if(dbUser)
                {
                    return dbUser.friends;
                }
                else
                {
                    throw new UserInputError('User not found');
                }
            } 
            catch (err) {
                throw new Error(err);
            }
        },
        async getInvitations(_, __, context)
        {
            const user = checkAuth(context);
            try {
                const dbUser = await User.findById(user.id);
                if(dbUser)
                {
                    return dbUser.invitations;
                }
                else
                {
                    throw new UserInputError('User not found');
                }
            } 
            catch (err) {
                throw new Error(err);  
            }
        },
        async sendFarmInvitation(_, { farmId, friendId }, context)
        {
            const user = checkAuth(context);
            try {
                let farm = await Farm.findById(farmId);
                let friend = await User.findById(friendId);
                console.log(farm)
                if(!friend)
                {
                    throw new UserInputError('User not found');
                }
                //check if already a member
                if(farm.members.find(mem => mem._id === friendId))
                {
                    throw new Error('User already a member');
                }
                //check if already invited
                if(farm.invited.find(inv => inv._id === friendId))
                {
                    throw new Error('User already invited');
                }
                const date = new Date().toISOString();
                friend.farmInvitations.push(
                    {
                        _id: farm._id,
                        farmName: farm.farmName,
                        farmType: farm.farmType,
                        invitedBy: user.username,
                        createdAt: date
                    }
                );
                await friend.save();
                farm.invited.push(
                    {
                        _id: friend._id,
                        username: friend.username,
                        email: friend.username,
                        createdAt: date
                    }
                );
                await farm.save();
                return 'Invited successfully';
            } catch (err) {
                throw new Error(err);
            }
        },
        async editProfile(_, { newProfile }, context)
        {
            const user = checkAuth(context);
            try 
            {
                let dbUser = await User.findById(user.id);
                if(!dbUser)
                {
                    throw new UserInputError("User not found");
                }
                dbUser.profile = newProfile;
                await dbUser.save();
                return "Profile updated";
            } 
            catch (err) 
            {
                throw new Error(err);
            }
        }
    }
}