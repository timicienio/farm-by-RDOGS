import { gql } from 'apollo-boost';

export const GET_FARM_QUERY = gql`
	query getFarm($farmId: ID!) {
		getFarm(farmId: $farmId) {
			id
			farmName
			farmType
			members {
				id
				username
				email
			}
			chunks {
				id
				coordinates {
					x
					y
				}
			}
			plants {
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

export const GET_FARMS_QUERY = gql`
	query {
		getFarms {
			id
			farmName
			farmType
			members {
				id
				username
				email
			}
			chunks {
				id
				coordinates {
					x
					y
				}
			}
			plants {
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
export const GET_USER_DATA_QUERY = gql`
	query getUserData($userId: ID!){
		getUserData(userId: $userId){
			email
			profile
			token
			username
			farms{
				id
				farmName
				farmType
			}
			invitations {
				id
				username
				email
			}
			friends {
				id
				username
				email			
			}
		}
	}
`;
export const GET_FRIENDS_LIST_QUERY = gql`
	query getFriendList($userId: ID!){
		getFriendList( userId: $userId){
			id
			username
			email
		}
	}
`;
export const GET_INVITATION_LIST_QUERY = gql`
	query getInvitationList($userId: ID!){
		getInvitationList( userId: $userId){
			id
			username
			email
		}
	}
` 