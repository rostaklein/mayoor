import React from 'react';
import { useTranslation } from 'react-i18next';
import { FormikErrors, Formik } from 'formik';
import { Row, Col } from 'antd';
import { NumberOutlined } from '@ant-design/icons';

import { StyledForm } from '../FormItem/Form.styles';
import { FormInput } from '../FormItem/FormInput';

export type OrderFormValues = {
	number: number | null;
	customer: string | null;
	totalPrice: number;
	totalTax: number;
	note: string;
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
		>
			{({ handleSubmit }) => (
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
						<Col span={6}></Col>
						<Col span={12}>Customer here</Col>
					</Row>
					{props.submitButton}
				</StyledForm>
			)}
		</Formik>
	);
};
