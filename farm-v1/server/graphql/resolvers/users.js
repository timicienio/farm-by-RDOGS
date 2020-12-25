const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { UserInputError, AuthenticationError } = require('apollo-server');

const User = require('../../models/User');
const Farm = require('../../models/Farm');
const { validateRegisterInput, validateLoginInput } = require('../../util/validators');
const { SECRET_KEY } = require('../../config');
const checkAuth = require('../../util/check-auth')

function genToken(user)
{
    return jwt.sign({
        id: user.id,
        email: user.email,
        username: user.username
    }, SECRET_KEY, { expiresIn: '1h' });
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
            console.log(`user.js ${confirmHash}`)
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

        async createPlant(_, { farmId, plantType, title, body, chunkCoordinates, plantCoordinates }, context)
        {
            const user = checkAuth(context);
            try
            {
                const farm = await Farm.findById(farmId);
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
                                plants: 
                                {
                                    plant
                                }
                            }
                        })
                    if(farm.plants.find(plt => plt.coordinates === plant.coordinates) !== -1)
                    {
                        return plant;
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
                members: [
                    {
                        username: user.username,
                        email: user.email,
                        joinedAt: date
                    }
                ],
                chunks: [
                    {
                        coordinates: {
                            x: 0,
                            y: 0
                        },
                        createdAt: date
                    }
                ],
                plants: [
                    {
                        plantType: 'Post',
                        title: 'Grow your first plant',
                        body: 'Press the button below to grow your first plant!',
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

            const farm = newFarm.save();

            return farm;
        },
        async leaveFarm(_, { farmId }, context)
        {
            console.log(context.req.headers.authorization)
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
        }
    }
}