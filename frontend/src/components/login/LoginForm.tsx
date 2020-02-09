import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Button, InputGroup, Callout } from '@blueprintjs/core';
import { useMutation } from 'react-apollo';
import { useFormik } from 'formik';
import { ApolloError } from 'apollo-client';

import {
	LoginMutation as LoginMutationType,
	LoginMutationVariables,
} from '../../__generated__/types';

import { LoginMutation } from './queries';

const StyledInputGroup = styled(InputGroup)``;

const CenteredWrapper = styled.div`
	padding: 30px 25px;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`;

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
	const [login, { loading }] = useMutation<LoginMutationType, LoginMutationVariables>(
		LoginMutation,
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
				console.log(result.data?.login);
				if (result.errors) {
					console.log(result.errors);
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
