import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery, useMutation } from 'react-apollo';
import { useParams, useHistory } from 'react-router-dom';
import { Button, message, Row, Col, Popconfirm, Skeleton } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import {
	GetOrder,
	GetOrderVariables,
	UpdateOrder,
	UpdateOrderVariables,
	DeleteOrder,
	DeleteOrderVariables,
} from '../../__generated__/types';
import { PageTitle } from '../MainWrapper/MainWrapper.styles';
import { OrderForm, OrderFormValues } from '../OrderForm/OrderForm';
import { CenteredSpinner } from '../SharedStyles/CenteredSpinner';
import { DetailDescription } from '../DetailDescription/DetailDescription';
import { OrderActionsWrapper } from '../SharedStyles/OrderActions';
import { GET_ORDER, UPDATE_ORDER } from '../DetailOrder/queries';
import { StyledLabel } from '../FormItem/Form.styles';

import { OrderWrapper } from './DetailOrderProduction.styles';

export const DetailOrderProduction: React.FC = () => {
	const routeParams = useParams<{ id: string }>();
	const { t } = useTranslation();

	const { data } = useQuery<GetOrder, GetOrderVariables>(GET_ORDER, {
		variables: { number: Number(routeParams.id) },
	});

	const [updateOrder, { loading }] = useMutation<UpdateOrder, UpdateOrderVariables>(UPDATE_ORDER);

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
					<Col sm={7}>
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
					<Col sm={7}></Col>
				</Row>
				{data.getOrderByNumber.items.map((item) => (
					<Row gutter={6} key={item.id}>
						<Col sm={4}>{item.material?.name}</Col>
						<Col sm={7}>{item.name}</Col>
						<Col sm={2}>{item.width} m</Col>
						<Col sm={2}>{item.height} m</Col>
						<Col sm={2}>{item.pieces}</Col>
						<Col sm={7}></Col>
					</Row>
				))}
			</OrderWrapper>
		</>
	);
};
