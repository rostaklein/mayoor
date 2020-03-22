import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-apollo';
import { useParams } from 'react-router-dom';

import { GetOrder, GetOrderVariables } from '../../__generated__/types';
import { PageTitle } from '../MainWrapper/MainWrapper.styles';

import { GET_ORDER } from './queries';

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

	return (
		<>
			<PageTitle>{orderTitle}</PageTitle>
			{JSON.stringify(data?.getOrder)}
		</>
	);
};
