import React from 'react';
import { useField, FieldArrayRenderProps } from 'formik';
import { Row, Col, Button, Popconfirm, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import { DeleteOutlined, CalculatorOutlined } from '@ant-design/icons';

import { OrderFormItem } from '../OrderForm';
import { FormInput } from '../../FormItem/FormInput';
import { CURRENCY_SUFFIX } from '../../../config';
import { client } from '../../../ApolloClient';
import { GET_ALL_MATERIALS } from '../../Material/queries';
import { GetAllMaterials } from '../../../__generated__/types';

import { MaterialPicker } from './MaterialPicker';
import { StyledItemNumber, MaterialColumn } from './OrderItemField.styles';

type FieldProps = {
	index: number;
	arrayHelpers: FieldArrayRenderProps;
};

export const OrderItemField: React.FC<FieldProps> = ({ index, arrayHelpers }) => {
	const { t } = useTranslation();
	const itemName = `items.${index}`;
	const [{ value }] = useField<OrderFormItem>(itemName);
	const calculateClickHandler = () => {
		const allMaterials = client.readQuery<GetAllMaterials>({ query: GET_ALL_MATERIALS });
		const material = allMaterials?.getAllMaterials.find(({ id }) => id === value.materialId);

		const { width, height, pieces } = value;
		console.log({ price: material?.price, width, height, pieces });
	};
	const calculationEnabled = value.materialId && value.width && value.height && value.pieces;
	return (
		<Row key={value.id || index} gutter={6}>
			<Col sm={5}>
				<MaterialColumn>
					<StyledItemNumber>{index + 1}.</StyledItemNumber>
					<MaterialPicker name={`${itemName}.materialId`} />
				</MaterialColumn>
			</Col>
			<Col sm={5}>
				<FormInput name={`${itemName}.name`} label={t('Name')} />
			</Col>
			<Col sm={2}>
				<FormInput name={`${itemName}.width`} suffix="m" type="number" />
			</Col>
			<Col sm={2}>
				<FormInput name={`${itemName}.height`} suffix="m" type="number" />
			</Col>
			<Col sm={2}>
				<FormInput
					name={`${itemName}.pieces`}
					label={t('Pieces')}
					type="number"
					min="0"
					step="1"
				/>
			</Col>
			<Col>
				<Tooltip title={t('Calculate row')}>
					<Button
						icon={<CalculatorOutlined />}
						shape="circle-outline"
						type="link"
						disabled={!calculationEnabled}
						onClick={calculateClickHandler}
					></Button>
				</Tooltip>
			</Col>
			<Col sm={3}>
				<FormInput
					name={`${itemName}.totalPrice`}
					label={t('Price')}
					suffix={CURRENCY_SUFFIX}
					type="number"
				/>
			</Col>
			<Col sm={3}>
				<FormInput
					name={`${itemName}.totalTax`}
					label={t('Tax')}
					suffix={CURRENCY_SUFFIX}
					type="number"
				/>
			</Col>
			<Col sm={1}>
				<Popconfirm
					title={t('Are you sure want to remove this item?')}
					onConfirm={() => arrayHelpers.remove(index)}
					placement="topRight"
					okText={t('Remove')}
					okType="danger"
				>
					<Button icon={<DeleteOutlined />} shape="circle-outline" type="link"></Button>
				</Popconfirm>
			</Col>
		</Row>
	);
};