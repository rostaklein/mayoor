import gql from 'graphql-tag';

export const GET_ALL_USERS = gql`
	query GetAllUsers {
		getAllUsers {
			id
			email
			name
			role
		}
	}
`;

export const ADD_USER = gql`
	mutation AddUser($input: CreateUserInput!) {
		addUser(input: $input) {
			id
			email
			name
			role
		}
	}
`;

export const UPDATE_USER = gql`
	mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {
		updateUser(id: $id, input: $input) {
			id
			email
			name
			role
		}
	}
`;

export const DELETE_USER = gql`
	mutation DeleteUser($id: ID!) {
		deleteUser(id: $id) {
			id
		}
	}
`;
