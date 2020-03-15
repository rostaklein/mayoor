import React from 'react';
import { useTranslation } from 'react-i18next';
import { Formik, FieldArray } from 'formik';
import { Row, Col, Button } from 'antd';
import { NumberOutlined, PlusCircleOutlined } from '@ant-design/icons';

import { StyledForm, StyledLabel, StyledDivider } from '../FormItem/Form.styles';
import { FormInput } from '../FormItem/FormInput';
import { dummyMaterialItem } from '../NewOrder/NewOrder';

import { CustomerPicker } from './CustomerPicker';
import { OrderItemField } from './OrderItemField/OrderItemField';
import { getOrderValidationSchema } from './validateOrder';

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
	number: number | null;
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
			validationSchema={getOrderValidationSchema(t)}
			enableReinitialize
		>
			{({ handleSubmit, values }) => (
				<StyledForm onSubmit={handleSubmit}>
					<Row gutter={8}>
						<Col span={4}>
							<FormInput
								name="number"
								label={t('Order number')}
								icon={<NumberOutlined />}
								withLabel
								type="number"
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
						<Col sm={5}>
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
						<Col sm={1}></Col>
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
					<FormInput name="totalPrice" label={t('Total price')} type="number" />
					<FormInput name="totalTax" label={t('Total tax')} type="number" />
					{props.submitButton}
				</StyledForm>
			)}
		</Formik>
	);
};
