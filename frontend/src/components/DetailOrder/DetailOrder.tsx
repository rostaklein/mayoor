import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery, useMutation } from 'react-apollo';
import { useParams } from 'react-router-dom';
import { Button, message } from 'antd';

import {
	GetOrder,
	GetOrderVariables,
	UpdateOrder,
	UpdateOrderVariables,
} from '../../__generated__/types';
import { PageTitle } from '../MainWrapper/MainWrapper.styles';
import { OrderForm, OrderFormValues } from '../OrderForm/OrderForm';
import { CenteredSpinner } from '../SharedStyles/CenteredSpinner';

import { GET_ORDER, UPDATE_ORDER } from './queries';
import { mapToOrderFormValues } from './mapToOrderFormValues';

export const DetailOrder: React.FC = () => {
	const routeParams = useParams<{ id: string }>();
	const { t } = useTranslation();

	const { data } = useQuery<GetOrder, GetOrderVariables>(GET_ORDER, {
		variables: { id: routeParams.id },
	});

	const orderTitle = t('Order #{{number}} {{customerName}}', {
		number: data?.getOrder?.number,
		customerName: data?.getOrder?.customer?.name,
	});

	useEffect(() => {
		document.title = `${orderTitle} | mayoor`;
	}, [data?.getOrder?.number]);

	const initialValues = mapToOrderFormValues(data);

	const [updateOrder, { loading }] = useMutation<UpdateOrder, UpdateOrderVariables>(UPDATE_ORDER);

	const submitHandler = async (orderValues: OrderFormValues) => {
		const { urgency, status, customerId, totalPrice, totalTax, note } = orderValues;
		try {
			await updateOrder({
				variables: {
					id: routeParams.id,
					input: {
						urgency,
						status,
						customerId,
						totalPrice: totalPrice || 0,
						totalTax: totalTax || 0,
						note,
						items: orderValues.items.map((item) => ({
							...item,
							totalTax: item.totalTax || 0,
							totalPrice: item.totalPrice || 0,
						})),
					},
				},
			});
			message.success(t('order_updated'));
		} catch (err) {
			console.error(err);
			message.error(t('order_update_fail'));
		}
	};

	return (
		<>
			<PageTitle>{orderTitle}</PageTitle>
			{initialValues ? (
				<OrderForm
					initialValues={initialValues}
					onSubmit={submitHandler}
					submitButton={
						<Button
							type="primary"
							htmlType="submit"
							style={{ marginTop: 10 }}
							loading={loading}
						>
							{t('Save order')}
						</Button>
					}
				/>
			) : (
				<CenteredSpinner />
			)}
		</>
	);
};
