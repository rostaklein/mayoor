import gql from 'graphql-tag';

export const CHANGE_PASSWORD_MUTATION = gql`
	mutation ChangePasswordMutation($oldPassword: String!, $newPassword: String!) {
		changePassword(oldPassword: $oldPassword, newPassword: $newPassword) {
			id
			name
		}
	}
`;
