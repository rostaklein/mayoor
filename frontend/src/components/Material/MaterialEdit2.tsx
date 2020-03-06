/* eslint-disable  @typescript-eslint/camelcase */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-apollo';
import { Table, Form, Input, Button } from 'antd';
import { ColumnProps } from 'antd/lib/table';

import { PageTitle } from '../MainWrapper/MainWrapper.styles';
import {
	GetAllMaterials,
	GetAllCustomersVariables,
	GetAllMaterials_getAllMaterials,
} from '../../__generated__/types';
import { StyledTableWrapper } from '../SharedStyles/Table.styles';
import { useDateFormatter } from '../../locales/useDateFormatter';

import { GET_ALL_MATERIALS } from './queries';

type Record = GetAllMaterials_getAllMaterials;
type Column = ColumnProps<Record>;

type TableCellProps = {
	editing: boolean;
	editable: boolean;
	record: Record;
	dataIndex: keyof Record;
	title: string;
};

const TableCell: React.FC<TableCellProps> = (props) => {
	const { editing, editable, record, dataIndex, title } = props;
	if (!editable || !editing) {
		return <td>{props.children}</td>;
	}
	console.log({ editing, editable });
	return (
		<td>
			<Input value={record[dataIndex]} placeholder={title} />
		</td>
	);
};

export const MaterialEdit: React.FC = () => {
	const { t } = useTranslation();
	const { f } = useDateFormatter();
	const [currentlyEditedId, setCurrentlyEditedId] = useState<string | null>(null);

	const { data, loading } = useQuery<GetAllMaterials, GetAllCustomersVariables>(
		GET_ALL_MATERIALS,
	);

	const columns: Array<Column & { editable: boolean }> = [
		{
			title: t('Material name'),
			ellipsis: true,
			dataIndex: 'name',
			editable: true,
		},
		{
			title: t('Price'),
			dataIndex: 'price',
			editable: true,
		},
		{
			title: t('Last updated at'),
			ellipsis: true,
			dataIndex: 'updatedAt',
			editable: true,
			render: (date: string) => f(date, 'datetime'),
		},
		{
			key: 'actions',
			editable: false,
			render: (_, record) => {
				return (
					<Button
						shape="circle"
						icon="edit"
						onClick={() => setCurrentlyEditedId(record.id)}
					/>
				);
			},
		},
	];

	const columnsWithOnCell: Column[] = columns.map((column) => {
		return {
			...column,
			onCell: (record) => ({
				record,
				dataIndex: column.dataIndex,
				title: column.title,
				isEditable: column.editable,
				isEditing: true,
				editing: record.id === currentlyEditedId,
			}),
		};
	});

	return (
		<>
			<PageTitle>{t('Material')}</PageTitle>
			{currentlyEditedId}
			<StyledTableWrapper>
				<Table<GetAllMaterials_getAllMaterials>
					components={{ body: { cell: TableCell } }}
					columns={columnsWithOnCell}
					dataSource={data?.getAllMaterials}
					loading={loading}
					size="middle"
					pagination={false}
				></Table>
			</StyledTableWrapper>
		</>
	);
};
