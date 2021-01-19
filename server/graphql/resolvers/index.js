const mutationResolvers = require('./mutation.js');
const queryResolvers = require('./query.js');
const subscriptionResolvers = require('./subscription.js')

module.exports = {
    Query: {
        ...queryResolvers.Query,
    },
    Mutation: {
        ...mutationResolvers.Mutation,
    },
    Subscription: {
        ...subscriptionResolvers.Subscription,
    }
};