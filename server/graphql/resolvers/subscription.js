const { PubSub } = require('apollo-server');
const { subscribe } = require('graphql');

const Farm = require('../../models/Farm')
const User = require('../../models/User')

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
        },
        friendList: {
            async subscribe(_, { userId }, { pubsub } ) {
                // console.log("sub", userId)
                const user = await User.findById(userId);
                if(!user)
                {
                    throw new Error("User not found");
                }
                return pubsub.asyncIterator(`subscribe friendList ${userId}`);
            }
        }
    }
}