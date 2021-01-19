require('dotenv-defaults').config();
const { ApolloServer, PubSub } = require('apollo-server');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs.js');
const resolvers = require('./graphql/resolvers')

const pubsub = new PubSub();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req, res}) => ({req, res, pubsub}),
    cors: {
        origin: '*',
        credentials: true
    }
});

if(!process.env.MONGO_URL)
{
    console.error('Missing MONGO_URL');
    process.exit(1);
}

mongoose.connect(process.env.MONGO_URL, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log('MongoDB Connected');
    return server.listen({ port: 5000 });
}).then((res) => {
    console.log(`Server running at ${res.url}`);  
});