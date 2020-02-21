import React from 'react';
import { useTranslation } from 'react-i18next';
import { useFormik, FormikErrors } from 'formik';
import { Form, Icon, Input, Button, Row, Col, Divider, message } from 'antd';
import { useMutation } from 'react-apollo';

import { CreateCustomerMutation, CreateCustomerMutationVariables } from '../../__generated__/types';

import { StyledForm, StyledDivider, StyledFormItem } from './NewCustomer.styles';
import { CREATE_CUSTOMER_MUTATION } from './queries';

const initialValues = {
	name: '',
	identificationNumber: '',
	taxIdentificationNumber: '',
	personName: '',
	phone: '',
	email: '',
};

type FormValues = typeof initialValues;

export const NewCustomer: React.FC = () => {
	const { t } = useTranslation();

	const [createCustomer, { loading }] = useMutation<
		CreateCustomerMutation,
		CreateCustomerMutationVariables
	>(CREATE_CUSTOMER_MUTATION);

	const formik = useFormik<FormValues>({
		initialValues,
		validate: (values) => {
			const errors: FormikErrors<FormValues> = {};
			if (!values.name) {
				errors.name = t('missing_company_name');
			}
			return errors;
		},
		onSubmit: async (values) => {
			await createCustomer({ variables: values });
			message.success(t('customer_created'));
			formik.resetForm();
		},
	});

	const getField = (name: keyof FormValues, label: string, icon?: string) => {
		const errorMessage = formik.touched[name] && formik.errors[name];
		const status = errorMessage ? 'error' : '';
		return (
			<StyledFormItem validateStatus={status} help={errorMessage}>
				<Input
					prefix={icon && <Icon type={icon} />}
					placeholder={label}
					name={name}
					onChange={formik.handleChange}
					value={formik.values[name]}
				/>
			</StyledFormItem>
		);
	};
	return (
		<StyledForm onSubmit={formik.handleSubmit}>
			<Row>
				<Col xs={24} sm={12}>
					{getField('name', t('Company name'), 'contacts')}
					<Row gutter={16}>
						<Col span={12}>
							{getField('identificationNumber', t('Identification number'), 'number')}
						</Col>
						<Col span={12}>
							{getField(
								'taxIdentificationNumber',
								t('Tax identification number'),
								'hdd',
							)}
						</Col>
					</Row>
					<StyledDivider orientation="left">{t('Contact person')}</StyledDivider>
					{getField('personName', t('Contact person name'), 'user')}
					<Row gutter={16}>
						<Col span={12}>{getField('email', t('Email'), 'mail')}</Col>
						<Col span={12}>{getField('phone', t('Phone'), 'phone')}</Col>
					</Row>
					<Button
						type="primary"
						htmlType="submit"
						loading={loading}
						style={{ marginTop: 10 }}
					>
						{t('Add customer')}
					</Button>
				</Col>
			</Row>
		</StyledForm>
	);
};
