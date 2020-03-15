import React from 'react';
import { useTranslation } from 'react-i18next';
import { FormikErrors, Formik, FieldArray, Field } from 'formik';
import { Row, Col, Divider } from 'antd';
import { NumberOutlined } from '@ant-design/icons';

import { StyledForm, StyledLabel, StyledDivider } from '../FormItem/Form.styles';
import { FormInput } from '../FormItem/FormInput';
import { dummyMaterialItem } from '../NewOrder/NewOrder';

import { CustomerPicker } from './CustomerPicker';
import { OrderItemField } from './OrderItemField/OrderItemField';

export type OrderFormItem = {
	id?: string;
	name: string;
	materialId: string | null;
	width: string;
	height: string;
	pieces: number;
	totalPrice: number;
	totalTax: number;
};

export type OrderFormValues = {
	number: string | null;
	customerId: string | null;
	totalPrice: string;
	totalTax: string;
	note: string;
	items: OrderFormItem[];
};

type Props = {
	initialValues: OrderFormValues;
	onSubmit: (values: OrderFormValues, resetForm: () => void) => Promise<void>;
	submitButton: React.ReactNode;
};

export const OrderForm: React.FC<Props> = (props) => {
	const { t } = useTranslation();

	return (
		<Formik<OrderFormValues>
			initialValues={props.initialValues}
			onSubmit={async (values, { resetForm }) => {
				await props.onSubmit(values, resetForm);
			}}
			validate={(values) => {
				const errors: FormikErrors<OrderFormValues> = {};
				if (!values.number) {
					errors.number = t('missing_order_number');
				}
				return errors;
			}}
			enableReinitialize
		>
			{({ handleSubmit, values }) => (
				<StyledForm onSubmit={handleSubmit}>
					<Row gutter={16}>
						<Col span={6}>
							<FormInput
								name="number"
								label={t('Order number')}
								icon={<NumberOutlined />}
								withLabel
							/>
						</Col>
						<Col span={8}>
							<CustomerPicker />
						</Col>
						<Col span={10}>{/* <CustomerPicker /> */}</Col>
					</Row>
					<StyledDivider />
					<Row gutter={6}>
						<Col sm={1}></Col>
						<Col sm={6}>
							<StyledLabel>{t('Material')}</StyledLabel>
						</Col>
						<Col sm={6}>
							<StyledLabel>{t('Name')}</StyledLabel>
						</Col>
						<Col sm={2}>
							<StyledLabel>{t('Width')}</StyledLabel>
						</Col>
						<Col sm={2}>
							<StyledLabel>{t('Height')}</StyledLabel>
						</Col>
						<Col sm={2}>
							<StyledLabel>{t('Pieces')}</StyledLabel>
						</Col>
						<Col sm={2}>
							<StyledLabel>{t('Price')}</StyledLabel>
						</Col>
						<Col sm={2}>
							<StyledLabel>{t('Tax')}</StyledLabel>
						</Col>
						<Col sm={1}></Col>
					</Row>
					<FieldArray
						name="items"
						render={(arrayHelpers) => (
							<div>
								{values.items.length > 0 &&
									values.items.map((item, index) => (
										<OrderItemField
											key={item.id || index}
											index={index}
											arrayHelpers={arrayHelpers}
										/>
									))}
								<button
									type="button"
									onClick={() => arrayHelpers.push(dummyMaterialItem)}
								>
									{/* show this when user has removed all friends from the list */}
									Add a friend
								</button>
							</div>
						)}
					/>
					{props.submitButton}
				</StyledForm>
			)}
		</Formik>
	);
};
