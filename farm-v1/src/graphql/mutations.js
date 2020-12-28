import { gql } from 'apollo-boost'

export const REGISTER_MUTATION = gql`
    mutation register(
        $username: String!
        $passwordHash: String!
        $confirmHash: String!
        $email: String!
    ){
        register(
            username: $username
        )
    }
`

export const LOGIN_MUTATION = gql`
    mutation login(
        $username: String!
        $passwordHash: String!
    ){
        login(
            username: $username
        )
    }
`