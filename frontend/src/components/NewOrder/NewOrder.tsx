import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'antd';

import { PageTitle } from '../MainWrapper/MainWrapper.styles';
import { OrderForm, OrderFormValues } from '../OrderForm/OrderForm';

export const NewOrder: React.FC = () => {
	const { t } = useTranslation();
	const initialValues: OrderFormValues = {
		number: 0,
		customer: null,
		totalPrice: 0,
		totalTax: 0,
		note: '',
	};
	return (
		<>
			<PageTitle>{t('Add order')}</PageTitle>
			<OrderForm
				initialValues={initialValues}
				onSubmit={async (a) => {
					console.log(a);
				}}
				submitButton={
					<Button type="primary" htmlType="submit" style={{ marginTop: 10 }}>
						{t('Add order')}
					</Button>
				}
			></OrderForm>
		</>
	);
};
