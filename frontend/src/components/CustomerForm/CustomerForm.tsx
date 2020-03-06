import React from 'react';
import { useTranslation } from 'react-i18next';
import { FormikErrors, Formik } from 'formik';
import { Icon, Input, Row, Col, Checkbox } from 'antd';

import { StyledFormItem, StyledForm, StyledDivider } from '../SharedStyles/Form.styles';
import { FormInput } from '../FormItem/FormInput';

import { IdentificationNumberInput } from './IdentificationNumberInput';

export type UserFormValues = {
	name: string | null;
	identificationNumber: string | null;
	taxIdentificationNumber: string | null;
	personName: string | null;
	phone: string | null;
	email: string | null;
	note: string | null;
	allowedBankPayments: boolean;
	addresses: {
		isPrimary: boolean;
		street: string | null;
		city: string | null;
		postNumber: string | null;
	}[];
};

type Props = {
	initialValues: UserFormValues;
	onSubmit: (values: UserFormValues, resetForm: () => void) => Promise<void>;
	submitButton: React.ReactNode;
};

export const CustomerForm: React.FC<Props> = (props) => {
	const { t } = useTranslation();

	return (
		<Formik<UserFormValues>
			initialValues={props.initialValues}
			onSubmit={async (values, { resetForm }) => {
				await props.onSubmit(values, resetForm);
			}}
			validate={(values) => {
				const errors: FormikErrors<UserFormValues> = {};
				if (!values.name) {
					errors.name = t('missing_company_name');
				}
				return errors;
			}}
			render={({ values, setFieldValue, handleChange }) => (
				<StyledForm>
					<Row gutter={32}>
						<Col xs={24} md={12}>
							<FormInput name="name" label={t('Company name')} icon="contacts" />
							<Row gutter={16}>
								<Col span={12}>
									<IdentificationNumberInput />
								</Col>
								<Col span={12}>
									<FormInput
										name="taxIdentificationNumber"
										label={t('Tax identification number')}
										icon="hdd"
									/>
								</Col>
							</Row>
							<StyledDivider orientation="left">{t('Contact person')}</StyledDivider>
							<FormInput
								name="personName"
								label={t('Contact person name')}
								icon="user"
							/>
							<Row gutter={16}>
								<Col span={12}>
									<FormInput name="email" label={t('Email')} icon="mail" />
								</Col>
								<Col span={12}>
									<FormInput name="phone" label={t('Phone')} icon="phone" />
								</Col>
							</Row>
						</Col>
						<Col xs={24} md={12}>
							<Checkbox
								name="allowedBankPayments"
								onClick={() =>
									setFieldValue(
										'allowedBankPayments',
										!values.allowedBankPayments,
									)
								}
								checked={values.allowedBankPayments}
							>
								{t('Allow bank payments')}
							</Checkbox>
							<StyledFormItem label={t('Note')}>
								<Input.TextArea
									rows={4}
									name="note"
									placeholder={t('customer_note_placeholder')}
									onChange={handleChange}
									value={values.note || ''}
								/>
							</StyledFormItem>
						</Col>
					</Row>
					<Row gutter={32}>
						{values.addresses.map((_, i) => (
							<Col xs={24} md={12} key={i}>
								<StyledDivider orientation="left">
									{i === 0 ? t('Shipping address') : t('Billing address')}
								</StyledDivider>
								<StyledFormItem>
									<Input
										name={`addresses.${i}.street`}
										prefix={<Icon type="environment" />}
										placeholder={t('Street')}
										onChange={handleChange}
										value={values.addresses[i].street || ''}
									/>
								</StyledFormItem>
								<Row gutter={12}>
									<Col span={16}>
										<StyledFormItem>
											<Input
												name={`addresses.${i}.city`}
												prefix={<Icon type="home" />}
												placeholder={t('City')}
												onChange={handleChange}
												value={values.addresses[i].city || ''}
											/>
										</StyledFormItem>
									</Col>
									<Col span={8}>
										<StyledFormItem>
											<Input
												name={`addresses.${i}.postNumber`}
												prefix={<Icon type="number" />}
												placeholder={t('Post Number')}
												onChange={handleChange}
												value={values.addresses[i].postNumber || ''}
											/>
										</StyledFormItem>
									</Col>
								</Row>
							</Col>
						))}
					</Row>
					{props.submitButton}
				</StyledForm>
			)}
		></Formik>
	);
};
