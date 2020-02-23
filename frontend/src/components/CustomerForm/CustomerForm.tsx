import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormik, FormikErrors } from 'formik';
import { Icon, Input, Row, Col, Checkbox } from 'antd';
import { useQuery } from 'react-apollo';
import { ApolloError } from 'apollo-client';

import { GetCustomerHelperInfoVariables, GetCustomerHelperInfo } from '../../__generated__/types';
import { GET_CUSTOMER_HELPER_INFO } from '../NewCustomer/queries';
import { StyledFormItem, StyledForm, StyledDivider } from '../NewCustomer/NewCustomer.styles';

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
	const [isLoadingHelperInfo, setIsLoadingHelperInfo] = useState(false);

	const formik = useFormik<UserFormValues>({
		initialValues: props.initialValues,
		validate: (values) => {
			const errors: FormikErrors<UserFormValues> = {};
			if (!values.name) {
				errors.name = t('missing_company_name');
			}
			return errors;
		},
		onSubmit: async (values) => {
			await props.onSubmit(values, formik.resetForm);
		},
	});

	const helperInfoQuery = useQuery<GetCustomerHelperInfo, GetCustomerHelperInfoVariables>(
		GET_CUSTOMER_HELPER_INFO,
		{
			skip: true,
			onError: console.error,
		},
	);

	const queryForHelperInfo = async () => {
		setIsLoadingHelperInfo(true);
		if (!formik.values.identificationNumber) {
			return formik.setFieldError(
				'identificationNumber',
				t('Identification number required for the search'),
			);
		}
		try {
			const {
				data: { getCustomerHelperInfo },
			} = await helperInfoQuery.refetch({
				partialIdentificationNumber: formik.values.identificationNumber,
			});

			const {
				taxIdentificationNumber,
				name,
				city,
				street,
				postNumber,
			} = getCustomerHelperInfo;

			formik.setValues({
				...formik.values,
				taxIdentificationNumber:
					taxIdentificationNumber || formik.values.taxIdentificationNumber,
				name: name || formik.values.name,
			});
			formik.setFieldValue('addresses.0', { city, street, postNumber });
		} catch (err) {
			if (err instanceof ApolloError) {
				if (err.graphQLErrors[0].extensions?.code === 'INFO_NOT_FOUND') {
					formik.setErrors({
						...formik.errors,
						identificationNumber: t('company_not_found_in_ares'),
					});
				}
			}
		}
		setIsLoadingHelperInfo(false);
	};

	const getField = (name: keyof UserFormValues, label: string, icon?: string) => {
		const errorMessage = formik.touched[name] && formik.errors[name];
		const status = errorMessage ? 'error' : '';
		const value = formik.values[name];
		const getValue = () => {
			if (typeof value === 'string') {
				return value;
			}
			return '';
		};
		return (
			<StyledFormItem validateStatus={status} help={errorMessage}>
				<Input
					prefix={icon && <Icon type={icon} />}
					placeholder={label}
					name={name}
					onChange={formik.handleChange}
					value={getValue()}
				/>
			</StyledFormItem>
		);
	};
	return (
		<StyledForm onSubmit={formik.handleSubmit}>
			<Row gutter={32}>
				<Col xs={24} md={12}>
					{getField('name', t('Company name'), 'contacts')}
					<Row gutter={16}>
						<Col span={12}>
							<StyledFormItem
								validateStatus={formik.errors.identificationNumber ? 'error' : ''}
								help={formik.errors.identificationNumber}
							>
								<Input.Search
									name={'identificationNumber'}
									prefix={<Icon type="number" />}
									placeholder={t('Identification number')}
									onSearch={queryForHelperInfo}
									onChange={formik.handleChange}
									value={formik.values.identificationNumber || ''}
									enterButton
									loading={isLoadingHelperInfo}
								/>
							</StyledFormItem>
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
				</Col>
				<Col xs={24} md={12}>
					<Checkbox
						name="allowedBankPayments"
						onClick={() =>
							formik.setFieldValue(
								'allowedBankPayments',
								!formik.values.allowedBankPayments,
							)
						}
						checked={formik.values.allowedBankPayments}
					>
						{t('Allow bank payments')}
					</Checkbox>
					<StyledFormItem label={t('Note')}>
						<Input.TextArea
							rows={4}
							name="note"
							placeholder={t('customer_note_placeholder')}
							onChange={formik.handleChange}
							value={formik.values.note || ''}
						/>
					</StyledFormItem>
				</Col>
			</Row>
			<Row gutter={32}>
				{formik.values.addresses.map((_, i) => (
					<Col xs={24} md={12} key={i}>
						<StyledDivider orientation="left">
							{i === 0 ? t('Shipping address') : t('Billing address')}
						</StyledDivider>
						<StyledFormItem>
							<Input
								name={`addresses.${i}.street`}
								prefix={<Icon type="environment" />}
								placeholder={t('Street')}
								onChange={formik.handleChange}
								value={formik.values.addresses[i].street || ''}
							/>
						</StyledFormItem>
						<Row gutter={12}>
							<Col span={16}>
								<StyledFormItem>
									<Input
										name={`addresses.${i}.city`}
										prefix={<Icon type="home" />}
										placeholder={t('City')}
										onChange={formik.handleChange}
										value={formik.values.addresses[i].city || ''}
									/>
								</StyledFormItem>
							</Col>
							<Col span={8}>
								<StyledFormItem>
									<Input
										name={`addresses.${i}.postNumber`}
										prefix={<Icon type="number" />}
										placeholder={t('Post Number')}
										onChange={formik.handleChange}
										value={formik.values.addresses[i].postNumber || ''}
									/>
								</StyledFormItem>
							</Col>
						</Row>
					</Col>
				))}
			</Row>
			{props.submitButton}
		</StyledForm>
	);
};
