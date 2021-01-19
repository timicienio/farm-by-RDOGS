const { PubSub } = require('apollo-server');

const Farm = require('../../models/Farm')

module.exports = {
    Subscription: {
        farm: {
            async subscribe(_, { farmId }, { pubsub }) {
                const farm = await Farm.findById(farmId);
                if(!farm)
                {
                    throw new Error("Farm not found");
                }
                return pubsub.asyncIterator(`subscribe farm ${farmId}`);
            }
        }
    }
}