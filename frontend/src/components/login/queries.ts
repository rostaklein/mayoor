import gql from 'graphql-tag';

export const LoginMutation = gql`
	mutation LoginMutation($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			user {
				name
			}
			token
		}
	}
`;
