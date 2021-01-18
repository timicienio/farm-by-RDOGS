import { gql } from 'apollo-boost'

// export const GETFARM_QUERY = gql`
//     query {
//         Farm (
//             # $farmId: ID!
//         ) {
//             Farm {
//                 _id
//                 farmName
//                 farmType
//                 members
//                 chunks
//                 plants
//                 createdAt
//             }
//         }
//     }
// `

export const GETFARMS_QUERY = gql`
    query{
        getFarms{
            id
            farmName
            farmType
            members{
                id
                username
                email
            }
            chunks{
                id
                coordinates{
                x
                y
                }
            }
            plants{
                id
                plantType
                title
                body
                chunkCoordinates{
                x
                y
                }
                plantCoordinates{
                x
                y
                }
                author
            }
        }
    }
`