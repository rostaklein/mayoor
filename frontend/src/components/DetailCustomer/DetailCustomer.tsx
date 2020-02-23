import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from 'react-apollo';
import { Button, Spin, Tag, Descriptions, Icon, message } from 'antd';
import styled from '@emotion/styled';

import {
	GetCustomer,
	GetCustomerVariables,
	UpdateCustomer,
	UpdateCustomerVariables,
} from '../../__generated__/types';
import { UserFormValues, CustomerForm } from '../CustomerForm/CustomerForm';
import { PageTitle } from '../MainWrapper/MainWrapper.styles';
import { useDateFormatter } from '../../locales/useDateFormatter';

import { GET_CUSTOMER, UPDATE_CUSTOMER } from './queries';

const StyledDescriptions = styled(Descriptions)`
	padding: 0 25px;
	.ant-descriptions-item-label,
	.ant-descriptions-item-content {
		font-size: 12px;
	}
	.anticon {
		margin-right: 3px;
	}
`;

export const DetailCustomer: React.FC = () => {
	const routeParams = useParams<{ id: string }>();
	const { t } = useTranslation();
	const { f } = useDateFormatter();
	const { data } = useQuery<GetCustomer, GetCustomerVariables>(GET_CUSTOMER, {
		variables: { id: routeParams.id },
	});

	const [updateCustomer, { loading }] = useMutation<UpdateCustomer, UpdateCustomerVariables>(
		UPDATE_CUSTOMER,
	);

	useEffect(() => {
		document.title = `${data?.getCustomer?.name} | mayoor`;
	}, [data?.getCustomer]);

	const submitHandler = async (values: UserFormValues) => {
		try {
			const {
				name,
				identificationNumber,
				taxIdentificationNumber,
				personName,
				email,
				phone,
				note,
				allowedBankPayments,
				addresses,
			} = values;

			await updateCustomer({
				variables: {
					input: {
						id: routeParams.id,
						name,
						identificationNumber,
						taxIdentificationNumber,
						personName,
						email,
						phone,
						note,
						allowedBankPayments,
						addresses: data?.getCustomer?.addresses.map((addr, i) => {
							const { street, city, postNumber, isPrimary } = addresses[i];
							return { id: addr.id, street, city, postNumber, isPrimary };
						}),
					},
				},
			});
			message.success(t('customer_updated'));
		} catch (err) {
			console.error(err);
			message.error(t('customer_update_fail'));
		}
	};

	if (!data || !data.getCustomer) {
		return <Spin />;
	}

	return (
		<>
			<PageTitle>{data.getCustomer.name}</PageTitle>
			<StyledDescriptions>
				<Descriptions.Item label={t('Created By')}>
					<Icon type="user" />
					{data.getCustomer.createdBy.name}
				</Descriptions.Item>
				<Descriptions.Item label={t('Created At')}>
					<Icon type="calendar" /> {f(data.getCustomer.createdAt, 'datetime')}
				</Descriptions.Item>
				<Descriptions.Item label={t('Last Updated At')}>
					<Icon type="calendar" /> {f(data.getCustomer.updatedAt, 'datetime')}
				</Descriptions.Item>
			</StyledDescriptions>
			<CustomerForm
				onSubmit={submitHandler}
				submitButton={
					<Button
						type="primary"
						htmlType="submit"
						loading={loading}
						style={{ marginTop: 10 }}
					>
						{t('Save customer')}
					</Button>
				}
				initialValues={data.getCustomer}
			/>
		</>
	);
};
