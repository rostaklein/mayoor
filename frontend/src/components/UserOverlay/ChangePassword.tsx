import React from 'react';
import { FormGroup, InputGroup, Button } from '@blueprintjs/core';
import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';
import { FormikErrors, useFormik } from 'formik';
import { ApolloError } from 'apollo-client';
import { useMutation } from 'react-apollo';
import { Position, Toaster } from '@blueprintjs/core';

import { ChangePasswordMutation, ChangePasswordMutationVariables } from '../../__generated__/types';

import { CHANGE_PASSWORD_MUTATION } from './queries';

const NewPasswordLine = styled.div`
	display: flex;
	> div {
		flex: 1;
		&:first-of-type {
			margin-right: 20px;
		}
	}
`;

type FormValues = {
	oldPassword: string;
	newPassword: string;
	newPasswordRepeat: string;
};

export const ChangePassword: React.FC = () => {
	const { t } = useTranslation();
	const [changePassword, { loading }] = useMutation<
		ChangePasswordMutation,
		ChangePasswordMutationVariables
	>(CHANGE_PASSWORD_MUTATION);

	const formik = useFormik<FormValues>({
		initialValues: {
			oldPassword: '',
			newPassword: '',
			newPasswordRepeat: '',
		},
		validate: (values) => {
			const errors: FormikErrors<FormValues> = {};
			if (values.newPassword !== values.newPasswordRepeat) {
				errors.newPasswordRepeat = t('passwords_must_match', {
					defaultValue: 'New passwords must match!',
				});
			}
			return errors;
		},
		onSubmit: async ({ oldPassword, newPassword }) => {
			try {
				await changePassword({ variables: { oldPassword, newPassword } });
				Toaster.create({
					position: Position.TOP,
				}).show({
					message: t('password_change_success', 'Password successfully changed.'),
					intent: 'success',
					icon: 'tick',
				});
				formik.resetForm();
			} catch (err) {
				if (err instanceof ApolloError) {
					if (err.graphQLErrors[0].extensions?.code === 'INVALID_PASSWORD') {
						formik.setErrors({
							oldPassword: t('invalid_password', {
								defaultValue: 'Old password is incorrect.',
							}),
						});
					}
				}
			}
		},
	});

	const getPasswordField = (name: keyof FormValues, label: string) => {
		const errorMessage = formik.touched[name] && formik.errors[name];
		const intent = errorMessage ? 'danger' : 'none';
		return (
			<FormGroup label={label} helperText={errorMessage} intent={intent}>
				<InputGroup
					placeholder={label}
					leftIcon="lock"
					type="password"
					name={name}
					intent={intent}
					value={formik.values[name]}
					onChange={formik.handleChange}
					required
				/>
			</FormGroup>
		);
	};

	return (
		<form onSubmit={formik.handleSubmit}>
			<h4>Change your password</h4>
			{getPasswordField('oldPassword', t('Old Password'))}
			<NewPasswordLine>
				{getPasswordField('newPassword', t('New Password'))}
				{getPasswordField('newPasswordRepeat', t('Repeat New Password'))}
			</NewPasswordLine>
			<Button intent="primary" type="submit" loading={loading}>
				{t('Change password')}
			</Button>
		</form>
	);
};
