import gql from 'graphql-tag';

export const LOGIN_MUTATION = gql`
	mutation LoginMutation($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			user {
				name
				id
				email
				role
			}
			token
		}
	}
`;

export const ME_QUERY = gql`
	query MeQuery {
		me {
			id
			name
			email
			role
		}
	}
`;
