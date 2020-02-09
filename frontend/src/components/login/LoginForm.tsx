import React from 'react';
import styled from '@emotion/styled';
import { Button, InputGroup, Callout } from '@blueprintjs/core';
import { useMutation } from 'react-apollo';
import { useFormik } from 'formik';
import { ApolloError } from 'apollo-client';

import {
	LoginMutation as LoginMutationType,
	LoginMutationVariables,
} from '../../__generated__/types';
import { CenteredWrapper } from '../CenteredWrapper/CenteredWrapper';
import { useAppDispatch } from '../../appContext/context';

import { LOGIN_MUTATION } from './queries';

const StyledInputGroup = styled(InputGroup)``;

const LoginWrapper = styled.form`
	width: 240px;
	min-height: 180px;
	display: flex;
	flex-direction: column;
	${StyledInputGroup} {
		margin-bottom: 10px;
	}
`;

const ErrorCallout = styled(Callout)`
	margin-top: 15px;
`;

export const LoginForm: React.FC = () => {
	const dispatch = useAppDispatch();
	const [login, { loading }] = useMutation<LoginMutationType, LoginMutationVariables>(
		LOGIN_MUTATION,
		{
			errorPolicy: 'all',
		},
	);

	const formik = useFormik({
		initialValues: {
			username: '',
			password: '',
		},
		onSubmit: async ({ username, password }) => {
			try {
				const result = await login({ variables: { email: username, password } });
				if (result.data?.login) {
					dispatch({ type: 'SET_CURRENT_USER', user: { ...result.data.login.user } });
					localStorage.setItem('auth-token', result.data.login.token);
				}
			} catch (err) {
				if (err instanceof ApolloError) {
					if (err.graphQLErrors[0].extensions?.code === 'USER_NOT_FOUND') {
						formik.setErrors({ username: 'User not found' });
					}
					if (err.graphQLErrors[0].extensions?.code === 'INVALID_PASSWORD') {
						formik.setErrors({ password: 'Invalid password' });
					}
				}
			}
		},
	});

	return (
		<CenteredWrapper>
			<LoginWrapper onSubmit={formik.handleSubmit}>
				<StyledInputGroup
					leftIcon="user"
					placeholder={'Username'}
					name="username"
					onChange={formik.handleChange}
					value={formik.values.username}
					intent={formik.errors.username ? 'danger' : 'none'}
				/>
				<StyledInputGroup
					leftIcon="lock"
					placeholder={'Password'}
					name="password"
					type="password"
					onChange={formik.handleChange}
					value={formik.values.password}
				/>
				<Button intent="primary" icon={'log-in'} type="submit" fill loading={loading}>
					Log In
				</Button>
				{!formik.isValid && (
					<ErrorCallout intent="danger">
						{formik.errors.password || formik.errors.username}
					</ErrorCallout>
				)}
			</LoginWrapper>
		</CenteredWrapper>
	);
};
