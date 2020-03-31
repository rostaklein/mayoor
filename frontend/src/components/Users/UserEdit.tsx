/* eslint-disable  @typescript-eslint/camelcase */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-apollo';
import { DeleteOutlined, SaveOutlined } from '@ant-design/icons';
import { Row, Col, Button, Popconfirm, Select } from 'antd';
import { Formik } from 'formik';
import { TFunction } from 'i18next';
import * as Yup from 'yup';

import { PageTitle } from '../MainWrapper/MainWrapper.styles';
import { GetAllUsers, GetAllUsers_getAllUsers } from '../../__generated__/types';
import { StyledForm, StyledLabel } from '../FormItem/Form.styles';
import { FormInput } from '../FormItem/FormInput';
import { MaterialEditWrapper } from '../Material/MaterialEdit.styles';

import { GET_ALL_USERS } from './queries';
import { UserRoleSelect } from './UserRoleSelect';

export const getUserValidationSchema = (t: TFunction) =>
	Yup.object().shape({
		email: Yup.string().required(t('field_required')),
		name: Yup.string().required(t('field_required')),
		role: Yup.string().required(t('field_required')),
	});

export const UserEdit: React.FC = () => {
	const { t } = useTranslation();
	const [currentlyLoading, setCurrentlyLoading] = useState<string | null>(null);

	const { data } = useQuery<GetAllUsers>(GET_ALL_USERS);

	return (
		<>
			<PageTitle>{t('Users')}</PageTitle>
			<StyledForm>
				<MaterialEditWrapper>
					<>
						<Row gutter={18}>
							<Col sm={4}>
								<StyledLabel>{t('Login email')}</StyledLabel>
							</Col>
							<Col sm={4}>
								<StyledLabel>{t('Change password')}</StyledLabel>
							</Col>
							<Col sm={6}>
								<StyledLabel>{t('User Name')}</StyledLabel>
							</Col>
							<Col sm={4}>
								<StyledLabel>{t('Role')}</StyledLabel>
							</Col>
							<Col sm={4}></Col>
						</Row>
						{data?.getAllUsers.map((user) => (
							<Formik<GetAllUsers_getAllUsers>
								key={user.id}
								initialValues={user}
								onSubmit={async (values) => {
									setCurrentlyLoading(user.id);
									console.log(values);
									// await updateMaterial({
									// 	variables: {
									// 		id: material.id,
									// 		name: values.name,
									// 		price: Number(values.price),
									// 	},
									// });
									setCurrentlyLoading(null);
								}}
								validationSchema={getUserValidationSchema(t)}
							>
								{({ handleSubmit }) => (
									<Row gutter={18}>
										<Col sm={4}>
											<FormInput
												label={t('Login email')}
												name="email"
											></FormInput>
										</Col>
										<Col sm={4}>
											<FormInput
												label={t('New Password')}
												name="password"
												type="password"
											></FormInput>
										</Col>
										<Col sm={6}>
											<FormInput
												label={t('User Name')}
												name="name"
											></FormInput>
										</Col>
										<Col sm={4}>
											<UserRoleSelect />
										</Col>
										<Col sm={3}>
											<Button
												onClick={() => handleSubmit()}
												loading={currentlyLoading === user.id}
												icon={<SaveOutlined />}
												style={{ width: '100%' }}
											>
												{t('Save')}
											</Button>
										</Col>
										<Col sm={1} style={{ textAlign: 'right' }}>
											<Popconfirm
												placement="topRight"
												onConfirm={async () =>
													console.log('Deleting', user.id)
												}
												title={t('Do you really want to remove this user?')}
											>
												<Button
													shape="circle"
													icon={<DeleteOutlined />}
												></Button>
											</Popconfirm>
										</Col>
									</Row>
								)}
							</Formik>
						))}
						{/* <MaterialCreate /> */}
					</>
				</MaterialEditWrapper>
			</StyledForm>
		</>
	);
};
