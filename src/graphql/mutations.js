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
	mutation sendInvitation($friendId: ID!) {
		sendInvitation(friendId: $friendId) {
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
	mutation acceptInvitation($friendId: ID!) {
		acceptInvitation(friendId: $friendId) {
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
