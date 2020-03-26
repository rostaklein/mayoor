import React from 'react';
import { useField, FieldArrayRenderProps } from 'formik';
import { Col, Button, Popconfirm, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import { DeleteOutlined, CalculatorOutlined } from '@ant-design/icons';

import { OrderFormItem } from '../OrderForm';
import { FormInput } from '../../FormItem/FormInput';
import { CURRENCY_SUFFIX } from '../../../config';
import { client } from '../../../ApolloClient';
import { GET_ALL_MATERIALS } from '../../Material/queries';
import { GetAllMaterials } from '../../../__generated__/types';
import { calculateRow } from '../calculateRow';

import { MaterialPicker } from './MaterialPicker';
import {
	StyledItemNumber,
	MaterialColumn,
	WiderInputWrapper,
	StyledOrderRow,
	HiddenDeleteButton,
} from './OrderItemField.styles';

type FieldProps = {
	index: number;
	arrayHelpers: FieldArrayRenderProps;
};

export const OrderItemField: React.FC<FieldProps> = ({ index, arrayHelpers }) => {
	const { t } = useTranslation();
	const itemName = `items.${index}`;
	const [{ value }, , { setValue }] = useField<OrderFormItem>(itemName);
	const calculateClickHandler = () => {
		const allMaterials = client.readQuery<GetAllMaterials>({ query: GET_ALL_MATERIALS });
		const material = allMaterials?.getAllMaterials.find(({ id }) => id === value.materialId);

		const { width, height, pieces } = value;
		const { price, tax } = calculateRow({ width, height, pieces, unitPrice: material?.price });
		setValue({ ...value, totalPrice: price, totalTax: tax });
	};
	const calculationEnabled = value.materialId && value.width && value.height && value.pieces;
	return (
		<StyledOrderRow key={value.id || index} gutter={6}>
			<Col sm={4}>
				<MaterialColumn>
					<StyledItemNumber>{index + 1}.</StyledItemNumber>
					<MaterialPicker name={`${itemName}.materialId`} />
				</MaterialColumn>
			</Col>
			<Col sm={7}>
				<FormInput name={`${itemName}.name`} label={t('Name')} />
			</Col>
			<Col sm={2}>
				<WiderInputWrapper>
					<FormInput name={`${itemName}.width`} suffix="m" type="number" />
				</WiderInputWrapper>
			</Col>
			<Col sm={2}>
				<WiderInputWrapper>
					<FormInput name={`${itemName}.height`} suffix="m" type="number" />
				</WiderInputWrapper>
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
			<Col sm={1}>
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
				<HiddenDeleteButton>
					<Popconfirm
						title={t('Are you sure want to remove this item?')}
						onConfirm={() => arrayHelpers.remove(index)}
						placement="topRight"
						okText={t('Remove')}
						okType="danger"
					>
						<Button
							icon={<DeleteOutlined />}
							shape="circle-outline"
							type="link"
						></Button>
					</Popconfirm>
				</HiddenDeleteButton>
			</Col>
		</StyledOrderRow>
	);
};
