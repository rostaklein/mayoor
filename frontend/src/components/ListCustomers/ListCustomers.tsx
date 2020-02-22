/* eslint-disable  @typescript-eslint/camelcase */
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Table } from 'antd';
import { useQuery } from 'react-apollo';
import { TFunction } from 'i18next';
import { ColumnProps, PaginationConfig } from 'antd/lib/table';

import {
	GetAllCustomers,
	GetAllCustomersVariables,
	GetAllCustomers_getAllCustomers_edges_node,
} from '../../__generated__/types';

import { GET_ALL_CUSTOMERS_QUERY } from './queries';
import { StyledTableWrapper } from './ListCustomers.styles';

const PAGE_SIZE = 15;

const getColumns = (t: TFunction): ColumnProps<GetAllCustomers_getAllCustomers_edges_node>[] => [
	{
		title: t('Company name'),
		dataIndex: 'name',
	},
	{
		title: t('Identification number'),
		dataIndex: 'identificationNumber',
	},
	{
		title: t('Contact person name'),
		dataIndex: 'personName',
	},
	{
		title: t('Email'),
		dataIndex: 'email',
	},
	{
		title: t('Phone'),
		dataIndex: 'phone',
	},
];

export const ListCustomers: React.FC = () => {
	const { t } = useTranslation();
	const [currentPageNumber, setCurrentPageNumber] = useState(1);
	const [selectedItems, setSelectedItems] = useState<string[]>([]);
	const { data, loading, fetchMore } = useQuery<GetAllCustomers, GetAllCustomersVariables>(
		GET_ALL_CUSTOMERS_QUERY,
		{
			variables: { first: PAGE_SIZE },
		},
	);

	const nodes = data?.getAllCustomers.edges.map((edge) => edge.node) ?? [];

	const pagination: PaginationConfig = {
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

	return (
		<StyledTableWrapper>
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
					onSelectAll: (isSelected, selectedRows) => {
						setSelectedItems(selectedRows.map(({ id }) => id));
					},
				}}
			/>
		</StyledTableWrapper>
	);
};
