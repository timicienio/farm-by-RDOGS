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
            token
        }
    }
`