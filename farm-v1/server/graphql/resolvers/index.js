const usersResolvers = require('./users.js');
const farmsResolvers = require('./farms.js');

module.exports = {
    Query: {
        ...farmsResolvers.Query
    },
    Mutation: {
        ...usersResolvers.Mutation,
        // ...plantsResolvers.Mutation
    }
};