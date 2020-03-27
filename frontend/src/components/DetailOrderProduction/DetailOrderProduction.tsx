import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery, useMutation } from 'react-apollo';
import { useParams, useHistory } from 'react-router-dom';
import { Button, message, Row, Col, Popconfirm, Skeleton } from 'antd';
import { DeleteOutlined, PrinterOutlined } from '@ant-design/icons';

import {
	GetOrder,
	GetOrderVariables,
	UpdateOrder,
	UpdateOrderVariables,
	AddProductionLog,
	AddProductionLogVariables,
	ProductionLogType,
} from '../../__generated__/types';
import { PageTitle } from '../MainWrapper/MainWrapper.styles';
import { OrderForm, OrderFormValues } from '../OrderForm/OrderForm';
import { CenteredSpinner } from '../SharedStyles/CenteredSpinner';
import { DetailDescription } from '../DetailDescription/DetailDescription';
import { OrderActionsWrapper } from '../SharedStyles/OrderActions';
import { GET_ORDER, UPDATE_ORDER } from '../DetailOrder/queries';
import { StyledLabel } from '../FormItem/Form.styles';

import { OrderWrapper } from './DetailOrderProduction.styles';
import { ADD_PRODUCTION_LOG_MUTATION } from './queries';
import { ProductionRow } from './ProductionRow';

type Props = {
	productionLogType: ProductionLogType;
	productionButtonText: string;
};

export const DetailOrderProduction: React.FC<Props> = ({
	productionLogType,
	productionButtonText,
}) => {
	const routeParams = useParams<{ id: string }>();
	const { t } = useTranslation();

	const { data } = useQuery<GetOrder, GetOrderVariables>(GET_ORDER, {
		variables: { number: Number(routeParams.id) },
	});

	const [updateOrder, { loading }] = useMutation<UpdateOrder, UpdateOrderVariables>(UPDATE_ORDER);
	const [addProductionLog, { loading: productionLogLoading }] = useMutation<
		AddProductionLog,
		AddProductionLogVariables
	>(ADD_PRODUCTION_LOG_MUTATION);

	const updateNoteHandler = async (note: string) => {
		const id = data?.getOrderByNumber?.id;
		if (!id) {
			return;
		}
		try {
			await updateOrder({
				variables: {
					id,
					input: {
						note,
					},
				},
			});
			message.success(t('note_updated'));
		} catch (err) {
			console.error(err);
			message.error(t('note_update_fail'));
		}
	};

	const productionButtonHandler = (pieces: number, orderItemId: string) => {
		addProductionLog({ variables: { orderItemId, pieces, action: productionLogType } });
	};

	if (!data || !data.getOrderByNumber) {
		return (
			<PageTitle>
				<Skeleton active />
			</PageTitle>
		);
	}

	return (
		<>
			<PageTitle>
				{t('Order #{{number}}', {
					number: data?.getOrderByNumber?.number,
				})}
			</PageTitle>
			<DetailDescription
				createdAt={data?.getOrderByNumber?.createdAt}
				createdByName={data?.getOrderByNumber?.createdBy.name}
				updatedAt={data?.getOrderByNumber?.updatedAt}
			></DetailDescription>
			<OrderWrapper>
				<Row gutter={6}>
					<Col sm={4}>
						<StyledLabel>{t('Material')}</StyledLabel>
					</Col>
					<Col sm={4}>
						<StyledLabel>{t('Name')}</StyledLabel>
					</Col>
					<Col sm={2}>
						<StyledLabel>{t('Width')}</StyledLabel>
					</Col>
					<Col sm={2}>
						<StyledLabel>{t('Height')}</StyledLabel>
					</Col>
					<Col sm={2}>
						<StyledLabel>{t('Pieces')}</StyledLabel>
					</Col>
					<Col sm={2}>
						<StyledLabel>{t('Printed pcs')}</StyledLabel>
					</Col>
					<Col sm={2}>
						<StyledLabel>{t('Production done pcs')}</StyledLabel>
					</Col>
					<Col sm={5}></Col>
				</Row>
				{data.getOrderByNumber.items.map((item) => (
					<ProductionRow
						key={item.id}
						item={item}
						onProductionClick={productionButtonHandler}
						productionButtonText={productionButtonText}
					/>
				))}
			</OrderWrapper>
		</>
	);
};
