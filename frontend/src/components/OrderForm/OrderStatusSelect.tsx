import React from 'react';
import { useTranslation } from 'react-i18next';
import { Select } from 'antd';
import { useField } from 'formik';
import { TFunction } from 'i18next';

import { StyledFormItem, StyledLabel } from '../FormItem/Form.styles';
import { OrderStatus } from '../../__generated__/types';

export const getOrderStatuses = (t: TFunction): { [key in OrderStatus]: string } => ({
	NEW: t('New'),
	WAITING_FOR_CALCULATION: t('Waiting for calculation'),
	READY_TO_PRINT: t('Ready to print'),
	WAITING_FOR_PRODUCTION: t('Waiting for production'),
	TO_BE_SHIPPED: t('To be shipped'),
	DONE: t('Done'),
});

export const OrderStatusSelect: React.FC = () => {
	const { t } = useTranslation();
	const [{ value }, { touched, error }, { setValue }] = useField('status');
	const errorMessage = touched && error;
	const status = errorMessage ? 'error' : '';

	const statuses = getOrderStatuses(t);
	return (
		<StyledFormItem validateStatus={status} help={errorMessage}>
			<StyledLabel>{t('Order status')}</StyledLabel>
			<Select
				filterOption={false}
				onChange={(value) => setValue(value)}
				placeholder={t('Order status')}
				showSearch
				value={value}
				allowClear
				notFoundContent={t('Not found')}
			>
				{Object.entries(statuses).map(([key, label]) => (
					<Select.Option key={key} value={key}>
						{label}
					</Select.Option>
				))}
			</Select>
		</StyledFormItem>
	);
};
