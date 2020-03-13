import React from 'react';
import { useTranslation } from 'react-i18next';
import { FormikErrors, useFormik } from 'formik';
import { ApolloError } from 'apollo-client';
import { useMutation } from 'react-apollo';
import { LockFilled } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { message, Row, Col, Button, Input } from 'antd';
import styled from '@emotion/styled';

import { ChangePasswordMutation, ChangePasswordMutationVariables } from '../../__generated__/types';

import { CHANGE_PASSWORD_MUTATION } from './queries';

type FormValues = {
	oldPassword: string;
	newPassword: string;
	newPasswordRepeat: string;
};

const FormItemStyled = styled(Form.Item)`
	margin-bottom: 5px;
`;

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
				errors.newPasswordRepeat = t('new_passwords_must_match');
			}
			return errors;
		},
		onSubmit: async ({ oldPassword, newPassword }) => {
			try {
				await changePassword({ variables: { oldPassword, newPassword } });
				message.success(t('pwd_changed'));
				formik.resetForm();
			} catch (err) {
				if (err instanceof ApolloError) {
					if (err.graphQLErrors[0].extensions?.code === 'INVALID_PASSWORD') {
						formik.setErrors({
							oldPassword: t('old_pwd_incorrect'),
						});
					} else {
						message.error(t('error_changing_pwd'));
					}
				}
			}
		},
	});

	const getPasswordField = (name: keyof FormValues, label: string) => {
		const errorMessage = formik.touched[name] && formik.errors[name];
		const status = errorMessage ? 'error' : '';
		return (
			<FormItemStyled validateStatus={status} help={errorMessage}>
				<Input
					prefix={<LockFilled />}
					placeholder={label}
					name={name}
					onChange={formik.handleChange}
					value={formik.values[name]}
					type="password"
				/>
			</FormItemStyled>
		);
	};

	return (
		<form onSubmit={formik.handleSubmit}>
			<h4>{t('Change your password')}</h4>
			{getPasswordField('oldPassword', t('Old Password'))}
			<Row gutter={16}>
				<Col span={12}>{getPasswordField('newPassword', t('New Password'))}</Col>
				<Col span={12}>
					{getPasswordField('newPasswordRepeat', t('Repeat New Password'))}
				</Col>
			</Row>
			<Button type="primary" htmlType="submit" loading={loading}>
				{t('Change password')}
			</Button>
		</form>
	);
};
