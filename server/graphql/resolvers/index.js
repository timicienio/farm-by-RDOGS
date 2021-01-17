const mutationResolvers = require('./mutation.js');
const queryResolvers = require('./query.js');

module.exports = {
    Query: {
        ...queryResolvers.Query,
    },
    Mutation: {
        ...mutationResolvers.Mutation,
    }
};