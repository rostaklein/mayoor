/* eslint-disable  @typescript-eslint/camelcase */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { RightCircleOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import { useQuery } from 'react-apollo';
import { TFunction } from 'i18next';
import { ColumnProps } from 'antd/lib/table';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

import {
	OrderStatus,
	GetAllOrdersVariables,
	GetAllOrders,
	GetAllOrders_getAllOrders_items,
	OrderByArg,
	GetAllCustomersVariables,
} from '../../__generated__/types';
import { PageTitle } from '../MainWrapper/MainWrapper.styles';
import { PaginatedTable } from '../PaginatedTable/PaginatedTable';
import { DisplayTime } from '../DisplayTime/DisplayTime';
import { getUrgentOptions } from '../OrderForm/UrgentSlider';
import { ItemsInfoRow } from '../ListOrders/ItemsInfoRow';
import { GET_ALL_ORDERS_QUERY } from '../ListOrders/queries';

const PAGE_SIZE = 10;

const UrgentDot = styled.div<{ color: string | undefined }>`
	width: 10px;
	height: 10px;
	border-radius: 100%;
	background-color: ${({ color }) => color};
`;

const getColumns = (
	t: TFunction,
	linkSuffix: 'production' | 'print',
): ColumnProps<GetAllOrders_getAllOrders_items>[] => [
	{
		width: 25,
		ellipsis: true,
		dataIndex: 'urgency',
		render: (_, record) => {
			const urgency = getUrgentOptions(t);
			const activeUrgentOption = urgency.find((option) => option.value === record.urgency);
			return (
				<Tooltip title={activeUrgentOption?.label}>
					<UrgentDot color={activeUrgentOption?.color} />
				</Tooltip>
			);
		},
	},
	{
		title: t('Order nr.'),
		dataIndex: 'number',
		width: 80,
		render: (_, record) => {
			return <Link to={`/orders/${record.number}/${linkSuffix}`}>{record.number}</Link>;
		},
	},
	{
		title: t('Items info'),
		ellipsis: true,
		dataIndex: 'items',
		render: (_, { items, totalSize }) => <ItemsInfoRow items={items} totalSize={totalSize} />,
	},
	{
		title: t('Created at'),
		width: 200,
		ellipsis: true,
		dataIndex: 'createdAt',
		render: (_, { createdAt }) => <DisplayTime date={createdAt} />,
	},
	{
		key: 'actions',
		width: 40,
		render: (_, record) => {
			return (
				<Link to={`/orders/${record.number}/${linkSuffix}`}>
					<Button icon={<RightCircleOutlined />} type="link"></Button>
				</Link>
			);
		},
	},
];

export const ListOrdersProduction: React.FC<{
	status: OrderStatus.READY_TO_PRINT | OrderStatus.WAITING_FOR_PRODUCTION;
	title: string;
	linkSuffix: 'production' | 'print';
}> = ({ status, title, linkSuffix }) => {
	const { t } = useTranslation();

	const commonVariables: GetAllOrdersVariables = {
		first: PAGE_SIZE,
		status,
		orderByUrgency: OrderByArg.desc,
	};

	const { data, loading, fetchMore } = useQuery<GetAllOrders, GetAllOrdersVariables>(
		GET_ALL_ORDERS_QUERY,
		{
			variables: commonVariables,
			fetchPolicy: 'network-only',
		},
	);

	const paginationChangedHandler = (newPageNumber: number) => {
		fetchMore({
			variables: { ...commonVariables, skip: (newPageNumber - 1) * PAGE_SIZE },
			updateQuery: (_, { fetchMoreResult }) => {
				if (!fetchMoreResult) {
					throw new Error('Failed to load more');
				}
				return fetchMoreResult;
			},
		});
	};

	const items = data?.getAllOrders.items ?? [];

	return (
		<>
			<PageTitle>{title}</PageTitle>
			<PaginatedTable<GetAllOrders_getAllOrders_items>
				columns={getColumns(t, linkSuffix)}
				records={items}
				totalCount={data?.getAllOrders.totalCount ?? 0}
				onPaginationChange={paginationChangedHandler}
				loading={loading}
				translations={{
					emptyResult: t('Order list is empty'),
					search: t('Search orders'),
				}}
			/>
		</>
	);
};
