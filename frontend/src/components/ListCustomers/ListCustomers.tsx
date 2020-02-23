/* eslint-disable  @typescript-eslint/camelcase */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Table, Row, Col, Empty, Button } from 'antd';
import { useQuery } from 'react-apollo';
import { TFunction } from 'i18next';
import { ColumnProps, PaginationConfig } from 'antd/lib/table';
import { Link } from 'react-router-dom';

import {
	GetAllCustomers,
	GetAllCustomersVariables,
	GetAllCustomers_getAllCustomers_edges_node,
} from '../../__generated__/types';

import { GET_ALL_CUSTOMERS_QUERY } from './queries';
import { StyledTableWrapper, StyledSearch } from './ListCustomers.styles';

const PAGE_SIZE = 10;

const getColumns = (t: TFunction): ColumnProps<GetAllCustomers_getAllCustomers_edges_node>[] => [
	{
		title: t('Company name'),
		ellipsis: true,
		dataIndex: 'name',
	},
	{
		title: t('Identification number'),
		width: 150,
		ellipsis: true,
		dataIndex: 'identificationNumber',
	},
	{
		title: t('Contact person name'),
		width: 250,
		ellipsis: true,
		dataIndex: 'personName',
	},
	{
		title: t('Email'),
		width: 150,
		ellipsis: true,
		dataIndex: 'email',
	},
	{
		title: t('Phone'),
		width: 150,
		ellipsis: true,
		dataIndex: 'phone',
	},
	{
		key: 'actions',
		width: 50,
		render: (_, record) => {
			return (
				<Link to={`/customers/${record.id}`}>
					<Button icon="right-circle" type="link"></Button>
				</Link>
			);
		},
	},
];

export const ListCustomers: React.FC = () => {
	const { t } = useTranslation();
	const [currentPageNumber, setCurrentPageNumber] = useState(1);
	const [selectedItems, setSelectedItems] = useState<string[]>([]);
	const { data, loading, fetchMore, refetch } = useQuery<
		GetAllCustomers,
		GetAllCustomersVariables
	>(GET_ALL_CUSTOMERS_QUERY, {
		variables: { first: PAGE_SIZE },
	});

	const nodes = data?.getAllCustomers.edges.map((edge) => edge.node) ?? [];

	const pagination: PaginationConfig = {
		current: currentPageNumber,
		total: data?.getAllCustomers.totalCount,
		pageSize: PAGE_SIZE,
		hideOnSinglePage: true,
		showTotal: (total, range) =>
			t('Showing {{start}}-{{end}} of {{total}} customers', {
				total,
				start: range[0],
				end: range[1],
			}),
		onChange: (newPageNumber) => {
			let variables: GetAllCustomersVariables;
			if (newPageNumber > currentPageNumber) {
				variables = { first: PAGE_SIZE, after: data?.getAllCustomers.pageInfo.endCursor };
			} else {
				variables = {
					first: PAGE_SIZE,
					before: data?.getAllCustomers.pageInfo.startCursor,
				};
			}
			setCurrentPageNumber(newPageNumber);

			fetchMore({
				variables,
				updateQuery: (_, { fetchMoreResult }) => {
					if (!fetchMoreResult) {
						throw new Error('Failed to load more');
					}
					return fetchMoreResult;
				},
			});
		},
	};

	const selectHandler = (id: string, isSelected: boolean) => {
		if (isSelected) {
			return setSelectedItems([...selectedItems, id]);
		}
		setSelectedItems(selectedItems.filter((currentId) => currentId !== id));
	};

	const searchSubmitHandler = (searchValue: string) => {
		setCurrentPageNumber(1);
		refetch({ first: PAGE_SIZE, search: searchValue });
	};

	return (
		<StyledTableWrapper>
			<Row type="flex" justify="end">
				<Col xs={24} md={6}>
					<StyledSearch
						enterButton
						placeholder={t('Search customers')}
						onSearch={searchSubmitHandler}
					/>
				</Col>
			</Row>

			<Table<GetAllCustomers_getAllCustomers_edges_node>
				columns={getColumns(t)}
				dataSource={nodes}
				pagination={pagination}
				loading={loading}
				rowKey={(record) => record.id}
				size="middle"
				rowSelection={{
					onSelect: ({ id }, isSelected) => selectHandler(id, isSelected),
					selectedRowKeys: selectedItems,
					onSelectAll: (_, selectedRows) => {
						setSelectedItems(selectedRows.map(({ id }) => id));
					},
				}}
				locale={{
					emptyText: (
						<Empty
							image={Empty.PRESENTED_IMAGE_SIMPLE}
							description={t('Customers list is empty')}
						/>
					),
				}}
			/>
		</StyledTableWrapper>
	);
};
