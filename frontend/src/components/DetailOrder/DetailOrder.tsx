import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-apollo';
import { useParams } from 'react-router-dom';
import { Button } from 'antd';

import { GetOrder, GetOrderVariables } from '../../__generated__/types';
import { PageTitle } from '../MainWrapper/MainWrapper.styles';
import { OrderForm } from '../OrderForm/OrderForm';
import { CenteredSpinner } from '../SharedStyles/CenteredSpinner';

import { GET_ORDER } from './queries';
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

	return (
		<>
			<PageTitle>{orderTitle}</PageTitle>
			{initialValues ? (
				<OrderForm
					initialValues={initialValues}
					onSubmit={async (params) => console.log(params)}
					submitButton={
						<Button
							type="primary"
							htmlType="submit"
							style={{ marginTop: 10 }}
							loading={false}
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
