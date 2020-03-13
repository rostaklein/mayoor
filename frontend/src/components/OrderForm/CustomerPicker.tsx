import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Select } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import { useQuery } from 'react-apollo';
import debounce from 'lodash/debounce';
import { useField } from 'formik';

import { FindCustomerQuery, FindCustomerQueryVariables } from '../../__generated__/types';
import { StyledFormItem } from '../FormItem/Form.styles';

import { FIND_CUSTOMER_QUERY } from './queries';

const StyledSubName = styled.span`
	&:before {
		content: ' | ';
	}
	font-size: 12px;
	opacity: 0.5;
`;

export const CustomerPicker: React.FC = () => {
	const { t } = useTranslation();
	const [{ value }, { touched, error }, { setValue }] = useField('customerId');
	const errorMessage = touched && error;
	const status = errorMessage ? 'error' : '';

	const { data, loading, refetch } = useQuery<FindCustomerQuery, FindCustomerQueryVariables>(
		FIND_CUSTOMER_QUERY,
		{
			fetchPolicy: 'network-only',
		},
	);

	const searchHandler = (search: string) => {
		refetch({ search });
	};

	const debouncedSearchHandler = debounce(searchHandler, 500);

	const customers = data?.getAllCustomers.items ?? [];
	return (
		<StyledFormItem validateStatus={status} help={errorMessage}>
			<label>{t('Customer')}</label>
			<Select
				filterOption={false}
				onChange={(value) => (console.log(value), setValue(value))}
				placeholder={t('Select a customer')}
				onSearch={debouncedSearchHandler}
				showSearch
				value={value}
				loading={loading}
				allowClear
				notFoundContent={t('Not found')}
			>
				{customers.map((customer) => (
					<Select.Option key={customer.id} value={customer.id}>
						<UserOutlined style={{ marginRight: 5 }}></UserOutlined>
						<span>{customer.name}</span>{' '}
						{customer.identificationNumber && (
							<StyledSubName>{customer.identificationNumber}</StyledSubName>
						)}
					</Select.Option>
				))}
			</Select>
		</StyledFormItem>
	);
};
