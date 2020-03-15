import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, message, Spin } from 'antd';
import { useQuery, useMutation } from 'react-apollo';

import { PageTitle } from '../MainWrapper/MainWrapper.styles';
import { OrderForm, OrderFormValues, OrderFormItem } from '../OrderForm/OrderForm';
import {
	GetHighestOrderNumber,
	CreateOrder,
	CreateOrderVariables,
} from '../../__generated__/types';

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

const getInitialValues = (orderNumber: string | null): OrderFormValues => ({
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

	const submitHandler = async (values: OrderFormValues) => {
		if (values.number === null) {
			throw new Error('Cant submit with null order number');
		}
		await createOrder({
			variables: {
				input: {
					number: Number(values.number),
					totalPrice: Number(values.totalPrice),
					totalTax: Number(values.totalTax),
					note: values.note,
					customerId: values.customerId,
				},
			},
		});
		highestOrderNumberQuery.refetch();
	};

	const newOrderNumber = highestOrderNumberQuery.data
		? String((highestOrderNumberQuery.data.getHighestOrderNumber || 0) + 1)
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
