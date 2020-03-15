import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, message } from 'antd';
import { useQuery, useMutation } from 'react-apollo';

import { PageTitle } from '../MainWrapper/MainWrapper.styles';
import { OrderForm, OrderFormValues, OrderFormItem } from '../OrderForm/OrderForm';
import {
	GetHighestOrderNumber,
	CreateOrder,
	CreateOrderVariables,
} from '../../__generated__/types';
import { ValidatedOrder } from '../OrderForm/validateOrder';

import { GET_HIGHEST_ORDER_NUMBER, CREATE_ORDER } from './queries';

export const dummyMaterialItem: OrderFormItem = {
	materialId: undefined,
	name: 'test',
	pieces: 1,
	width: undefined,
	height: undefined,
	totalPrice: undefined,
	totalTax: undefined,
};

const getInitialValues = (orderNumber: number | null): OrderFormValues => ({
	number: orderNumber,
	customerId: undefined,
	totalPrice: undefined,
	totalTax: undefined,
	note: '',
	items: [dummyMaterialItem],
});

export const NewOrder: React.FC = () => {
	const { t } = useTranslation();

	const highestOrderNumberQuery = useQuery<GetHighestOrderNumber>(GET_HIGHEST_ORDER_NUMBER);
	const [createOrder, { loading }] = useMutation<CreateOrder, CreateOrderVariables>(
		CREATE_ORDER,
		{
			onError: (err) => {
				if (err.graphQLErrors[0].extensions?.code === 'ORDER_NUMBER_EXISTS') {
					message.error(t('order_number_exists'));
				}
			},
		},
	);

	const submitHandler = async (rawValues: OrderFormValues) => {
		const validValues = rawValues as ValidatedOrder; // gets triggered only when form is valid
		await createOrder({
			variables: {
				input: validValues,
			},
		});
		highestOrderNumberQuery.refetch();
	};

	const newOrderNumber = highestOrderNumberQuery.data
		? (highestOrderNumberQuery.data.getHighestOrderNumber || 0) + 1
		: null;

	return (
		<>
			<PageTitle>{t('Add order')}</PageTitle>
			<OrderForm
				initialValues={getInitialValues(newOrderNumber)}
				onSubmit={submitHandler}
				submitButton={
					<Button
						type="primary"
						htmlType="submit"
						style={{ marginTop: 10 }}
						loading={loading}
					>
						{t('Add order')}
					</Button>
				}
			/>
		</>
	);
};
