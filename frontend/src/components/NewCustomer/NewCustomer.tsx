import React from 'react';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { Form, Icon, Input, Button, Row, Col } from 'antd';

import { StyledForm } from './NewCustomer.styles';

const initialValues = {
	name: '',
	identificationNumber: '',
	taxIdentificationNumber: '',
};

type FormValues = typeof initialValues;

export const NewCustomer: React.FC = () => {
	const { t } = useTranslation();

	const formik = useFormik<FormValues>({
		initialValues,
		onSubmit: console.log,
	});

	const getField = (name: keyof FormValues, label: string, icon?: string) => {
		const errorMessage = formik.touched[name] && formik.errors[name];
		const status = errorMessage ? 'error' : '';
		return (
			<Form.Item validateStatus={status} help={errorMessage}>
				<Input
					prefix={icon && <Icon type={icon} />}
					placeholder={label}
					name={name}
					onChange={formik.handleChange}
					value={formik.values[name]}
				/>
			</Form.Item>
		);
	};
	return (
		<StyledForm onSubmit={formik.handleSubmit}>
			{getField('name', t('Company name'))}
			<Row gutter={16}>
				<Col span={12}>{getField('identificationNumber', t('Identification number'))}</Col>
				<Col span={12}>
					{getField('taxIdentificationNumber', t('Tax identification number'))}
				</Col>
			</Row>
			<Button type="primary" htmlType="submit">
				{t('Add customer')}
			</Button>
		</StyledForm>
	);
};
