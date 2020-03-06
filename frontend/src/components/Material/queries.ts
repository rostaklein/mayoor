import gql from 'graphql-tag';

export const GET_ALL_MATERIALS = gql`
	query GetAllMaterials {
		getAllMaterials {
			id
			name
			price
			updatedAt
		}
	}
`;
