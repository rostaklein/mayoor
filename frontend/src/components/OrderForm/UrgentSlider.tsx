import React from 'react';
import { useTranslation } from 'react-i18next';
import { Slider } from 'antd';
import { useField } from 'formik';

import { StyledFormItem, StyledLabel } from '../FormItem/Form.styles';

export const UrgentSlider: React.FC = () => {
	const { t } = useTranslation();
	const [{ value }, { touched, error }, { setValue }] = useField('urgency');
	const errorMessage = touched && error;
	const status = errorMessage ? 'error' : '';

	const urgentOptions = [t('Not Urgent'), t('Normal'), t('Hurry'), t('Urgent'), t('Very Urgent')];
	const marks = urgentOptions.reduce<{ [key: number]: string | undefined }>((acc, curr, i) => {
		acc[i] = value === i ? curr : undefined;
		return acc;
	}, {});

	return (
		<StyledFormItem validateStatus={status} help={errorMessage}>
			<StyledLabel>{t('Urgency')}</StyledLabel>
			<Slider
				min={0}
				max={4}
				marks={marks}
				value={value}
				onChange={setValue}
				tooltipVisible={false}
			></Slider>
		</StyledFormItem>
	);
};
