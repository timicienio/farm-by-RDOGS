const Farm = require('../../models/Farm');
const User = require('../../models/User');
const { UserInputError } = require('apollo-server');

module.exports = {
    Query: {
        async getFarms() 
        {
            try
            {
                const farms = await Farm.find().sort({ createdAt: -1 });
                console.log(farms[0].plants);
                return farms;
            }
            catch(err)
            {
                throw new Error(err);
            }
        },
        async getFarm(_, { farmId })
        {
            try{
                const farm = await Farm.findById(farmId);
                if(farm)
                {
                    return farm;
                }
                else
                {
                    throw new Error('Farm not found');
                }
            }
            catch(err){
                throw new Error(err);
            }
        },
        async getUserData(_, { userId })
        {
            try
            {
                const user = await User.findById(userId);
                if(!user)
                {
                    throw new UserInputError("User not found");
                }
                return {
                    ...user._doc,
                    id: user._id
                }
            }
            catch(err)
            {
                throw new Error(err);
            }
        }
    }
    
}