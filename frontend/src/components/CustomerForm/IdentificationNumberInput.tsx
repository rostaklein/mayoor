import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useField, useFormikContext } from 'formik';
import { Icon, Input } from 'antd';
import { useQuery } from 'react-apollo';
import { ApolloError } from 'apollo-client';

import { GetCustomerHelperInfo, GetCustomerHelperInfoVariables } from '../../__generated__/types';
import { GET_CUSTOMER_HELPER_INFO } from '../NewCustomer/queries';
import { StyledFormItem } from '../FormItem/Form.styles';

import { UserFormValues } from './CustomerForm';

export const IdentificationNumberInput: React.FC = () => {
	const { t } = useTranslation();

	const formikContext = useFormikContext<UserFormValues>();
	const [{ onChange, value }, { error }, { setError }] = useField('identificationNumber');
	const [isLoadingHelperInfo, setIsLoadingHelperInfo] = useState(false);

	const helperInfoQuery = useQuery<GetCustomerHelperInfo, GetCustomerHelperInfoVariables>(
		GET_CUSTOMER_HELPER_INFO,
		{
			skip: true,
			onError: console.error,
		},
	);

	const queryForHelperInfo = async () => {
		setIsLoadingHelperInfo(true);
		if (!value) {
			return setError(t('Identification number required for the search'));
		}
		try {
			const {
				data: { getCustomerHelperInfo },
			} = await helperInfoQuery.refetch({
				partialIdentificationNumber: value,
			});

			const {
				taxIdentificationNumber,
				name,
				city,
				street,
				postNumber,
			} = getCustomerHelperInfo;

			formikContext.setValues({
				...formikContext.values,
				taxIdentificationNumber:
					taxIdentificationNumber || formikContext.values.taxIdentificationNumber,
				name: name || formikContext.values.name,
			});
			formikContext.setFieldValue('addresses.0', { city, street, postNumber });
		} catch (err) {
			if (err instanceof ApolloError) {
				if (err.graphQLErrors[0].extensions?.code === 'INFO_NOT_FOUND') {
					setError(t('company_not_found_in_ares'));
				}
			}
		}
		setIsLoadingHelperInfo(false);
	};

	return (
		<StyledFormItem validateStatus={error ? 'error' : ''} help={error}>
			<Input.Search
				name={'identificationNumber'}
				prefix={<Icon type="number" />}
				placeholder={t('Identification number')}
				onSearch={queryForHelperInfo}
				onChange={onChange}
				value={value || ''}
				enterButton
				loading={isLoadingHelperInfo}
			/>
		</StyledFormItem>
	);
};
