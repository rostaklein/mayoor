import React from 'react';
import { useField, FieldArrayRenderProps } from 'formik';
import { Input, Row, Col, Button, Popover, Popconfirm } from 'antd';
import { useTranslation } from 'react-i18next';
import { DeleteColumnOutlined, DeleteOutlined } from '@ant-design/icons';

import { OrderFormItem } from '../OrderForm';
import { FormInput } from '../../FormItem/FormInput';
import { CURRENCY_SUFFIX } from '../../../config';

import { StyledItemNumber } from './OrderItemField.styles';

type FieldProps = {
	index: number;
	arrayHelpers: FieldArrayRenderProps;
};

export const OrderItemField: React.FC<FieldProps> = ({ index, arrayHelpers }) => {
	const { t } = useTranslation();
	const itemName = `items.${index}`;
	const [{ value, onChange }, { touched, error }] = useField<OrderFormItem>(itemName);
	const errorMessage = touched && error;
	const status = errorMessage ? 'error' : '';
	const getValue = () => {
		if (typeof value === 'string') {
			return value;
		}
		if (typeof value === 'number') {
			return String(value);
		}
		return '';
	};
	return (
		<Row key={value.id || index} gutter={6}>
			<Col sm={1}>
				<StyledItemNumber>{index + 1}.</StyledItemNumber>
			</Col>
			<Col sm={4}>
				<FormInput name={`${itemName}.materialId`} label={t('Material')} />
			</Col>
			<Col sm={6}>
				<FormInput name={`${itemName}.name`} label={t('Name')} />
			</Col>
			<Col sm={2}>
				<FormInput name={`${itemName}.width`} label={t('Width')} />
			</Col>
			<Col sm={2}>
				<FormInput name={`${itemName}.height`} label={t('Height')} />
			</Col>
			<Col sm={2}>
				<FormInput name={`${itemName}.pieces`} label={t('Pieces')} />
			</Col>
			<Col sm={3}>
				<FormInput
					name={`${itemName}.totalPrice`}
					label={t('Price')}
					suffix={CURRENCY_SUFFIX}
				/>
			</Col>
			<Col sm={3}>
				<FormInput
					name={`${itemName}.totalTax`}
					label={t('Tax')}
					suffix={CURRENCY_SUFFIX}
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
