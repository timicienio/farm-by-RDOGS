import { gql } from 'apollo-boost';

export const GET_FARM_QUERY = gql`
	query getFarm($farmId: ID!) {
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
