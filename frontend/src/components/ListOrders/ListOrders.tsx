/* eslint-disable  @typescript-eslint/camelcase */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RightCircleOutlined } from '@ant-design/icons';
import { Button, Select, Col, Row } from 'antd';
import { useQuery } from 'react-apollo';
import { TFunction } from 'i18next';
import { ColumnProps } from 'antd/lib/table';
import { Link } from 'react-router-dom';

import {
	GetAllOrders,
	GetAllOrdersVariables,
	GetAllOrders_getAllOrders_items,
	OrderStatus,
} from '../../__generated__/types';
import { PageTitle } from '../MainWrapper/MainWrapper.styles';
import { PaginatedTable } from '../PaginatedTable/PaginatedTable';
import { DisplayTime } from '../DisplayTime/DisplayTime';
import { getOrderStatuses } from '../OrderForm/OrderStatusSelect';
import { StyledFormItem, StyledLabel } from '../FormItem/Form.styles';

import { GET_ALL_ORDERS_QUERY } from './queries';

const PAGE_SIZE = 10;

const getColumns = (t: TFunction): ColumnProps<GetAllOrders_getAllOrders_items>[] => [
	{
		title: t('Order nr.'),
		dataIndex: 'number',
		width: 80,
		render: (_, record) => {
			return <Link to={`/orders/${record.id}`}>{record.number}</Link>;
		},
	},
	{
		title: t('Customer name'),
		width: 150,
		ellipsis: true,
		dataIndex: 'customer.name',
		render: (_, { customer }) =>
			customer && <Link to={`/customers/${customer.id}`}>{customer.name}</Link>,
	},
	{
		title: t('Items info'),
		ellipsis: true,
		dataIndex: 'items',
		render: (_, { items, totalSize }) => {
			const allMaterialNames = items.map((item) => item.material?.name);
			const distinctMaterials = [...new Set(allMaterialNames)].filter((item) => item);
			return (
				<>
					{totalSize} m<sup>2</sup>
					{distinctMaterials.length > 0 && `, ${distinctMaterials.join(', ')}`}
				</>
			);
		},
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
				<Link to={`/orders/${record.id}`}>
					<Button icon={<RightCircleOutlined />} type="link"></Button>
				</Link>
			);
		},
	},
];

export const ListOrders: React.FC = () => {
	const { t } = useTranslation();
	const [hasFilterActive, setHasFilterActive] = useState(false);

	const { data, loading, fetchMore, refetch } = useQuery<GetAllOrders, GetAllOrdersVariables>(
		GET_ALL_ORDERS_QUERY,
		{
			variables: { first: PAGE_SIZE },
			fetchPolicy: 'network-only',
		},
	);

	const paginationChangedHandler = (newPageNumber: number) => {
		fetchMore({
			variables: { first: PAGE_SIZE, skip: (newPageNumber - 1) * PAGE_SIZE },
			updateQuery: (_, { fetchMoreResult }) => {
				if (!fetchMoreResult) {
					throw new Error('Failed to load more');
				}
				return fetchMoreResult;
			},
		});
	};

	const handleFilterStatusChange = (status: OrderStatus | '') => {
		if (status === '') {
			setHasFilterActive(false);
			return refetch({ first: PAGE_SIZE, status: undefined });
		}
		setHasFilterActive(true);
		refetch({ first: PAGE_SIZE, status });
	};

	const items = data?.getAllOrders.items ?? [];

	const statuses = getOrderStatuses(t);

	return (
		<>
			<Row>
				<Col md={18}>
					<PageTitle>{t('List orders')}</PageTitle>
				</Col>
				<Col xs={24} md={6}>
					<StyledFormItem style={{ marginTop: 10, marginRight: 25 }}>
						<StyledLabel>{t('Filter by status')}</StyledLabel>
						<Select
							style={{ width: '100%' }}
							defaultValue=""
							onChange={handleFilterStatusChange}
						>
							<Select.Option value="">{t('Without status filter')}</Select.Option>
							{Object.entries(statuses).map(([value, label]) => (
								<Select.Option key={value} value={value}>
									{label}
								</Select.Option>
							))}
						</Select>
					</StyledFormItem>
				</Col>
			</Row>
			<PaginatedTable<GetAllOrders_getAllOrders_items>
				columns={getColumns(t)}
				records={items}
				totalCount={data?.getAllOrders.totalCount ?? 0}
				onPaginationChange={paginationChangedHandler}
				loading={loading}
				translations={{
					emptyResult: hasFilterActive
						? t('No orders found matching this filter.')
						: t('Order list is empty'),
					search: t('Search customers'),
				}}
			/>
		</>
	);
};
