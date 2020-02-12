import React from 'react';
import styled from '@emotion/styled';
import { Button, InputGroup, FormGroup } from '@blueprintjs/core';
import { useMutation } from 'react-apollo';
import { useFormik, FormikErrors } from 'formik';
import { ApolloError } from 'apollo-client';
import { useTranslation } from 'react-i18next';

import LogoImage from '../../images/mayoor_logo.svg';
import { LoginMutation, LoginMutationVariables } from '../../__generated__/types';
import { CenteredWrapper } from '../CenteredWrapper/CenteredWrapper';
import { useAppDispatch } from '../../appContext/context';
import { LanguageSwitch } from '../LanguageSwitch/LanguageSwitch';

import { LOGIN_MUTATION } from './queries';

const LoginWrapper = styled.form`
	width: 240px;
	min-height: 180px;
	display: flex;
	flex-direction: column;
`;

const FormGroupStyled = styled(FormGroup)`
	margin-bottom: 10px;
`;

const Logo = styled.img`
	width: 200px;
	margin: 30px auto;
`;

const LanguageSwitchWrapper = styled.div`
	display: flex;
	justify-content: center;
	margin: 15px;
`;

type FormValues = {
	username: string;
	password: string;
};

export const LoginForm: React.FC = () => {
	const dispatch = useAppDispatch();
	const { t } = useTranslation();
	const [login, { loading }] = useMutation<LoginMutation, LoginMutationVariables>(LOGIN_MUTATION);

	const { errors, handleSubmit, values, handleChange, isValid, setErrors, touched } = useFormik<
		FormValues
	>({
		initialValues: {
			username: '',
			password: '',
		},
		validate: (values) => {
			const errors: FormikErrors<FormValues> = {};
			if (!values.password) {
				errors.password = t('Please, fill in the password.');
			}
			if (!values.username) {
				errors.username = t('Please, fill in the username.');
			}
			return errors;
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
						setErrors({
							username: t('User not found.'),
						});
					}
					if (err.graphQLErrors[0].extensions?.code === 'INVALID_PASSWORD') {
						setErrors({
							password: t('Invalid password.'),
						});
					}
				}
			}
		},
	});

	return (
		<CenteredWrapper>
			<LoginWrapper onSubmit={handleSubmit}>
				<Logo src={LogoImage} />
				<FormGroupStyled
					helperText={touched.username && errors.username}
					intent={touched.username && errors.username ? 'danger' : 'none'}
				>
					<InputGroup
						leftIcon="user"
						placeholder={t('Username')}
						name="username"
						onChange={handleChange}
						value={values.username}
					/>
				</FormGroupStyled>
				<FormGroupStyled
					helperText={touched.password && errors.password}
					intent={touched.password && errors.password ? 'danger' : 'none'}
				>
					<InputGroup
						leftIcon="lock"
						placeholder={t('Password')}
						name="password"
						type="password"
						onChange={handleChange}
						value={values.password}
					/>
				</FormGroupStyled>
				<Button
					intent={'none'}
					icon={'log-in'}
					type="submit"
					fill
					loading={loading}
					disabled={!isValid}
				>
					{t('Log In')}
				</Button>
				<LanguageSwitchWrapper>
					<LanguageSwitch />
				</LanguageSwitchWrapper>
			</LoginWrapper>
		</CenteredWrapper>
	);
};
