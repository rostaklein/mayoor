import React from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-apollo';
import { SaveOutlined } from '@ant-design/icons';
import { Row, Col, Button, message } from 'antd';
import { Formik } from 'formik';
import { TFunction } from 'i18next';
import * as Yup from 'yup';

import { CreateUser, CreateUserVariables, UserRole, GetAllUsers } from '../../__generated__/types';
import { StyledLabel, StyledDivider } from '../FormItem/Form.styles';
import { FormInput } from '../FormItem/FormInput';

import { CREATE_USER, GET_ALL_USERS } from './queries';
import { UserRoleSelect } from './UserRoleSelect';

export const getUserValidationSchema = (t: TFunction) =>
	Yup.object().shape({
		email: Yup.string().required(t('field_required')),
		password: Yup.string().required(t('field_required')),
		name: Yup.string().required(t('field_required')),
		role: Yup.string().required(t('field_required')),
	});

type FormValue = {
	email: string;
	password: string;
	name: string;
	role: UserRole;
};

export const UserCreate: React.FC = () => {
	const { t } = useTranslation();

	const [createUser] = useMutation<CreateUser, CreateUserVariables>(CREATE_USER, {
		onCompleted: () => {
			message.success(t('User created'));
		},
		update: (cache, { data }) => {
			const cached = cache.readQuery<GetAllUsers>({ query: GET_ALL_USERS });
			if (cached === null || !data) {
				return;
			}
			const { getAllUsers } = cached;
			cache.writeQuery<GetAllUsers>({
				query: GET_ALL_USERS,
				data: {
					getAllUsers: [...getAllUsers, data.addUser],
				},
			});
		},
	});

	return (
		<>
			<StyledDivider orientation="left">{t('Add new user')}</StyledDivider>
			<Row gutter={18}>
				<Col sm={4}>
					<StyledLabel>{t('Login email')}</StyledLabel>
				</Col>
				<Col sm={4}>
					<StyledLabel>{t('Password')}</StyledLabel>
				</Col>
				<Col sm={6}>
					<StyledLabel>{t('User Name')}</StyledLabel>
				</Col>
				<Col sm={4}>
					<StyledLabel>{t('Role')}</StyledLabel>
				</Col>
				<Col sm={4}></Col>
			</Row>
			<Formik<FormValue>
				initialValues={{
					name: '',
					password: '',
					email: '',
					role: UserRole.FACTORY,
				}}
				onSubmit={(values) =>
					createUser({
						variables: {
							input: {
								email: values.email,
								name: values.name,
								password: values.password,
								role: values.role,
							},
						},
					})
				}
				validationSchema={getUserValidationSchema(t)}
			>
				{({ handleSubmit }) => (
					<form onSubmit={handleSubmit}>
						<Row gutter={18}>
							<Col sm={4}>
								<FormInput label={t('Login email')} name="email"></FormInput>
							</Col>
							<Col sm={4}>
								<FormInput
									label={t('Password')}
									name="password"
									type="password"
								></FormInput>
							</Col>
							<Col sm={6}>
								<FormInput label={t('User Name')} name="name"></FormInput>
							</Col>
							<Col sm={4}>
								<UserRoleSelect />
							</Col>
							<Col sm={3}>
								<Button
									icon={<SaveOutlined />}
									htmlType="submit"
									style={{ width: '100%' }}
									type="primary"
								>
									{t('Add')}
								</Button>
							</Col>
						</Row>
					</form>
				)}
			</Formik>
		</>
	);
};
