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
                var farm = await Farm.findById(farmId);
                if(!farm)
                {
                    throw new Error('Farm not found');
                }
                else if(farm.members.find(mem => mem.username === user.username) === -1)
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
                    await Farm.findByIdAndUpdate(farmId, 
                        {
                            $push: 
                            {
                                plants: plant
                            }
                        })
                    farm = await Farm.findById(farmId);
                    const plantIndex = farm.plants.find(plt => plt._id === plant._id);
                    if(plantIndex !== -1)
                    {
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

        // async deletePlant(_, { plantId }, context)
        // {
        //     const user = checkAuth(context);
        //     try{
        //         const plant = await Plant.findById(plantId);
        //         if(user.username === plant.username)
        //         {
        //             await plant.delete();
        //             return 'Plant deleted successfully';
        //         }
        //         else
        //         {
        //             throw new AuthenticationError('Action not allowed');
        //         }
        //     }
        //     catch(err)
        //     {
        //         throw new Error(err);
        //     }
        // }
        
        async createFarm(_, { farmName, farmType }, context)
        {
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

            const res = await newFarm.save();

            let dbUser = await User.findById(user.id);
            dbUser.farms.push({
                _id: res._id,
                farmName: res.farmName,
                farmType: res.farmType,
                createdAt: res.createdAt
            })

            return {
                ...res._doc,
                id: res._id
            };
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
                else if(farm.members.length === 0)
                {
                    farm.delete();
                    return 'No members left, farm deleted';
                }
                else if(farm.members.find(mem => mem.username === user.username) === -1)
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
        async acceptInvitation(_, { friendId }, context)
        {
            console.log(friendId);
            const user = checkAuth(context);
            try {
                const date = new Date().toISOString();
                console.log(friendId)
                var friend = await User.findById(friendId);
                var dbUser = await User.findById(user.id);
                if(!friend)
                {
                    throw new UserInputError('Friend user not found');
                }
                const invIndex = dbUser.invitations.find(inv => inv._id === friendId);
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
                return {
                    id: friend._id,
                    username: friend.username,
                    email: friend.email,
                    createdAt: date
                }
            }
            catch (err) {
                throw new Error(err);
            }
        },
        async sendInvitation(_, { friendId }, context)
        {
            const user = checkAuth(context);
            console.log(user);
            try {
                let friend = await User.findById(friendId);
                if(!friend)
                {
                    throw new UserInputError('User not found');
                }
                if(friend._id === user.id)
                {
                    throw new UserInputError('You cannot be friends with yourself');
                }
                if(friend.invitations.find(inv => inv._id === friendId) !== -1)
                {
                    throw new Error('Already invited');
                }
                const inv = {
                    _id: user.id,
                    username: user.username,
                    email: user.email,
                    createdAt: new Date().toISOString()
                }
                await friend.save();
                return {
                    id: inv._id,
                    username: inv.username,
                    email: inv.email,
                    createdAt: inv.createdAt,
                };
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
                if(farm.members.find(mem => mem._id === friendId) === -1)
                {
                    throw new Error('User already a member');
                }
                //check if already invited
                if(farm.invited.find(inv => inv._id === friendId) === -1)
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