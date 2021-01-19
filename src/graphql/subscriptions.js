import { gql } from 'apollo-boost'

export const FARM_SUBSCRIPTION = gql`
  subscription plant (
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
`
