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
		sendInvitation(friendName: $friendName)
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
		acceptInvitation(friendName: $friendName)
	}
`;
export const DECLINE_INVITATION_MUTATION = gql`
	mutation declineInvitation($friendName: String!) {
		declineInvitation(friendName: $friendName)
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
		$chunkCoordinates: CoordinateInput!
		$plantCoordinates: CoordinateInput!
	) {
		createPlant(
			plantInput: {
				farmId: $farmId
				plantType: $plantType
				title: $title
				body: $body
				chunkCoordinates: $chunkCoordinates
				plantCoordinates: $plantCoordinates
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
export const EDIT_PLANT_MUTATION = gql`
	mutation editPlant(
		$farmId: ID!
		$plantId: ID
		$plantType: String
		$title: String
		$body: String
		$chunkCoordinates: CoordinateInput
		$plantCoordinates: CoordinateInput
	) {
		editPlant(
			plantInput: {
				farmId: $farmId
				plantId: $plantId
				plantType: $plantType
				title: $title
				body: $body
				chunkCoordinates: $chunkCoordinates
				plantCoordinates: $plantCoordinates
			}
		) {
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
`;
export const DELETE_PLANT_MUTATION = gql`
	mutation deletePlant($farmId: ID!, $plantId: ID!){
		deletePlant(farmId: $farmId, plantId: $plantId)
	}
`;
export const LEAVE_FARM_MUTATION = gql`
	mutation leaveFarm($farmId: ID!) {
		leaveFarm(farmId: $farmId)
	}
`;
export const ADD_FARMER_MUTATION = gql`
	mutation addFarmer($farmId: ID!, $friendId: ID!) {
		addFarmer(farmId: $farmId, friendId: $friendId)
	}
`;
export const EDIT_PROFILE_MUTATION = gql`
	mutation editProfile($newProfile: String!) {
		editProfile(newProfile: $newProfile)
	}
`;
export const ADD_CHUNK_MUTATION = gql`
	mutation addChunk($farmId: ID!, $chunkCoordinates: CoordinateInput!){
		addChunk(
			farmId: $farmId,
			chunkCoordinates: $chunkCoordinates
		)
	}
`;
