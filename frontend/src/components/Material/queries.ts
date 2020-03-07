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

export const DELETE_MATERIAL = gql`
	mutation DeleteMaterial($id: ID!) {
		deleteMaterial(id: $id) {
			id
		}
	}
`;

export const CREATE_MATERIAL = gql`
	mutation CreateMaterial($name: String!, $price: Float!) {
		createMaterial(name: $name, price: $price) {
			id
			name
			price
			updatedAt
		}
	}
`;
