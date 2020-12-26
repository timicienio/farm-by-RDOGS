const Farm = require('../../models/Farm');

module.exports = {
    Query: {
        async getFarms() 
        {
            try
            {
                const farms = await Farm.find().sort({ createdAt: -1 });
                console.log(farms);
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
        }
    }
    
}