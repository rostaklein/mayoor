import React from 'react';
import { useTranslation } from 'react-i18next';
import { FormikErrors, Formik, FieldArray, Field } from 'formik';
import { Row, Col, Divider, Button } from 'antd';
import { NumberOutlined, PlusCircleOutlined } from '@ant-design/icons';

import { StyledForm, StyledLabel, StyledDivider } from '../FormItem/Form.styles';
import { FormInput } from '../FormItem/FormInput';
import { dummyMaterialItem } from '../NewOrder/NewOrder';

import { CustomerPicker } from './CustomerPicker';
import { OrderItemField } from './OrderItemField/OrderItemField';
import { validateOrder } from './validateOrder';

export type OrderFormItem = {
	id?: string;
	name?: string;
	materialId?: string;
	width?: number;
	height?: number;
	pieces?: number;
	totalPrice?: number;
	totalTax?: number;
};

export type OrderFormValues = {
	number: string | null;
	customerId?: string;
	totalPrice?: number;
	totalTax?: number;
	note?: string;
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
			validate={(values) => validateOrder(values, t)}
			enableReinitialize
		>
			{({ handleSubmit, values, touched }) => (
				console.log(touched),
				(
					<StyledForm onSubmit={handleSubmit}>
						<Row gutter={8}>
							<Col span={4}>
								<FormInput
									name="number"
									label={t('Order number')}
									icon={<NumberOutlined />}
									withLabel
								/>
							</Col>
							<Col span={7}>
								<CustomerPicker />
							</Col>
						</Row>
						<StyledDivider />
						<Row gutter={6}>
							<Col sm={5}>
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
							<Col sm={3}>
								<StyledLabel>{t('Price')}</StyledLabel>
							</Col>
							<Col sm={3}>
								<StyledLabel>{t('Tax')}</StyledLabel>
							</Col>
							<Col sm={1}></Col>
						</Row>
						<FieldArray
							name="items"
							render={(arrayHelpers) => (
								<>
									{values.items.length > 0 &&
										values.items.map((item, index) => (
											<OrderItemField
												key={item.id || index}
												index={index}
												arrayHelpers={arrayHelpers}
											/>
										))}
									<Row>
										<Button
											icon={<PlusCircleOutlined />}
											onClick={() => arrayHelpers.push(dummyMaterialItem)}
										>
											{t('Add item')}
										</Button>
									</Row>
								</>
							)}
						/>
						{props.submitButton}
					</StyledForm>
				)
			)}
		</Formik>
	);
};
