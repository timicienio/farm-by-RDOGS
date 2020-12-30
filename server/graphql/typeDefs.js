const { gql } = require('apollo-server');

module.exports = gql`
    type Farm {
        id: ID!
        farmName: String!
        farmType: String!
        members: [FarmUser]!
        chunks: [Chunk!]! 
        plants: [Plant]!
        createdAt: String!
    }
    type FarmUser{
        id: String!
        username: String!
        email: String!
        joinedAt: String!
    }
    type Chunk {
        id: ID!
        coordinates: Coordinate!
        createdAt: String!
    }
    type Coordinate {
        x: Int!
        y: Int!
    }
    type Plant {
        id: ID!
        plantType: String!
        title: String
        body: String!
        chunkCoordinates: Coordinate!
        plantCoordinates: Coordinate!
        author: String!
        createdAt: String!
    }
    type User {
        id: ID!
        email: String!
        token: String!
        username: String!
        invitations: [Friend]!
        friends: [Friend]!
        createdAt: String!
    }
    type Friend {
        id: String!
        username: String!
        email: String!
        createdAt: String!
    }
    input RegisterInput {
        username: String!
        passwordHash: String!
        confirmHash: String!
        email: String!
    }
    input CoordinateInput {
        x: Int!
        y: Int!
    }
    input PlantInput {
        farmId: ID!
        plantType: String!
        title: String
        body: String!
        chunkCoordinates: CoordinateInput!
        plantCoordinates: CoordinateInput!
    }
    type Query {
        getFarms: [Farm]!
        getFarm(farmId: ID!): Farm
        getPlants: [Plant]
        getPlant(plantId: ID!): Plant
    }
    type Mutation {
        register(registerInput: RegisterInput!): User!
        login(username: String!, passwordHash: String!): User!
        createPlant(plantInput: PlantInput!): Plant!
        # deletePlant(plantId: ID!): String!
        createFarm(farmName: String!, farmType: String!): Farm!
        leaveFarm(farmId: ID!): String!
        sendInvitation(friendId: ID!): Friend!
        acceptInvitation(friendId: ID!): Friend!
        getFriends: [Friend]!
        getInvitations: [Friend]!
    }
`;