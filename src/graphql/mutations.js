import { gql } from 'apollo-boost';

export const REGISTER_MUTATION = gql`
	mutation register(
		$username: String!
		$passwordHash: String!
		$confirmHash: String!
		$email: String!
	) {
		register(
			registerInput: {
				username: $username
				passwordHash: $passwordHash
				confirmHash: $confirmHash
				email: $email
			}
		) {
			username
			token
		}
	}
`;

export const LOGIN_MUTATION = gql`
	mutation login($username: String!, $passwordHash: String!) {
		login(username: $username, passwordHash: $passwordHash) {
			id
			email
			username
			token
		}
	}
`;
export const GET_FRIENDS_MUTATION = gql`
	mutation {
		getFriends {
			id
			username
			email
		}
	}
`;
export const SEND_INVITATION_MUTATION = gql`
	mutation sendInvitation($friendName: String!) {
		sendInvitation(friendName: $friendName) {
			id
			username
			email
		}
	}
`;
export const GET_INVITATIONS_MUTATION = gql`
	mutation {
		getInvitations {
			id
			username
			email
		}
	}
`;
export const ACCEPT_INVITATION_MUTATION = gql`
	mutation acceptInvitation($friendName: String!) {
		acceptInvitation(friendName: $friendName) {
			id
			username
			email
		}
	}
`;
export const CREATE_FARM_MUTATION = gql`
	mutation createFarm($farmName: String!, $farmType: String!) {
		createFarm(farmName: $farmName, farmType: $farmType) {
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
export const CREATE_PLANT_MUTATION = gql`
	mutation createPlant(
		$farmId: ID!
		$plantType: String!
		$title: String!
		$body: String!
		$chunkCoordinates: Coordinate!
		$plantCoordinates: Coordinate!
		$author: String!
	) {
		createPlant(
			plantInput: {
				farmId: $farmId
				plantType: $plantType
				title: $title
				body: $body
				chunkCoordinates: $chunkCoordinates
				plantCoordinates: $plantCoordinates
				author: $author
			}
		) {
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
`;
export const LEAVE_FARM_MUTATION = gql`
	mutation leaveFarm($farmId: String!) {
		leaveFarm(farmId: $farmId)
	}
`;
export const SEND_FARM_INVITATION_MUTATION = gql`
	mutation sendFarmInvitation($farmId: String!, $friendId: ID!) {
		sendFarmInvitation(farmId: $farmId, friendId: $friendId)
	}
`;
