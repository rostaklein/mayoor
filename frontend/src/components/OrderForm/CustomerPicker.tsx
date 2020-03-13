import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Select } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import { useQuery } from 'react-apollo';
import debounce from 'lodash/debounce';

import { StyledFormItem } from '../FormItem/Form.styles';
import { FindCustomerQuery, FindCustomerQueryVariables } from '../../__generated__/types';

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
	const [val, setVal] = useState<string>('ho');

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
		<StyledFormItem>
			<label>{t('Customer')}</label>
			<Select
				filterOption={false}
				onChange={(value) => setVal(value)}
				placeholder={t('Select a customer')}
				onSearch={debouncedSearchHandler}
				showSearch
				value={val}
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
