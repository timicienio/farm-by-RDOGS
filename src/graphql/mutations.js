import { gql } from 'apollo-boost'

export const REGISTER_MUTATION = gql`
    mutation register(
        $username: String!
        $passwordHash: String!
        $confirmHash: String!
        $email: String!
    ){
        register(
            registerInput:{
            username: $username
            passwordHash: $passwordHash
            confirmHash: $confirmHash
            email: $email
        } ){
            username
            token
        }
    }
`

export const LOGIN_MUTATION = gql`
    mutation login(
        $username: String!
        $passwordHash: String!
    ){
        login(
            username: $username
            passwordHash: $passwordHash
        ){
            id
            email
            username
            token
        }
    }
`
export const GETFRIENDS_MUTATION = gql`
    mutation {
        getFriends{
            id
            username
            email
        }
    }
`
export const SENDINVITATION_MUTATION = gql`
    mutation sendInvitation(
        $friendId: ID!
    ){
        sendInvitation(
            friendId: $friendId
        ){
            id
            username
            email
        }
    }
`
export const GETINVITATIONS_MUTATION = gql`
    mutation{
        getInvitations{
            id
            username
            email
        }
    }
`
export const ACCEPTINVITATION_MUTATION = gql`
    mutation acceptInvitation(
        $friendId: ID!
    ){
        acceptInvitation(
            friendId: $friendId
        ){
            id
            username
            email
        }
    }
`