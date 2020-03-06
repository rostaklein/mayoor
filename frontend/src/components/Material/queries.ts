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

export const UPDATE_MATERIAL = gql`
	mutation UpdateMaterial($id: ID!, $name: String, $price: Float) {
		updateMaterial(id: $id, name: $name, price: $price) {
			id
			name
			price
			updatedAt
		}
	}
`;
