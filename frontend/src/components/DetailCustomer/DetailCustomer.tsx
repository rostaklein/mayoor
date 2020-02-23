import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router-dom';
import { useQuery } from 'react-apollo';
import { Button, Spin } from 'antd';

import { GetCustomer, GetCustomerVariables } from '../../__generated__/types';
import { UserFormValues, CustomerForm } from '../CustomerForm/CustomerForm';

import { GET_CUSTOMER } from './queries';

export const DetailCustomer: React.FC = () => {
	const routeParams = useParams<{ id: string }>();
	const { t } = useTranslation();
	const { data } = useQuery<GetCustomer, GetCustomerVariables>(GET_CUSTOMER, {
		variables: { id: routeParams.id },
	});

	const submitHandler = async (values: UserFormValues) => {
		console.log(values);
	};

	if (!data || !data.getCustomer) {
		return <Spin />;
	}

	return (
		<CustomerForm
			onSubmit={submitHandler}
			submitButton={
				<Button type="primary" htmlType="submit" style={{ marginTop: 10 }}>
					{t('Save customer')}
				</Button>
			}
			initialValues={data.getCustomer}
		/>
	);
};
