import { gql } from 'apollo-boost'

export const FARM_SUBSCRIPTION = gql`
  subscription farm (
    $farmId: ID!
  ){
    farm(
        farmId: $farmId
    ){
        mutation
        index
        plant{
            id
            plantType
            title
            body
            chunkCoordinates {
                x
                y
            }
            plantCoordinates {
                x
                y
            }
            author
        }
    }
  }
`;
export const FRIEND_LIST_SUBSCRIPTION = gql`
  subscription($userId: ID!) {
    friendList(userId: $userId)
    {
      mutation
      friend
      {
        id 
        username
        email
      }
    }
  }
`