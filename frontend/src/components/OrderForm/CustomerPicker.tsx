import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Select } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';

import { StyledFormItem } from '../FormItem/Form.styles';

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
	return (
		<StyledFormItem>
			<label>{t('Customer')}</label>
			<Select
				filterOption={false}
				onChange={(value) => setVal(value)}
				placeholder={t('Select a customer')}
				onSearch={console.log}
				showSearch
				value={val}
				allowClear
			>
				{['hey', 'ho'].map((d) => (
					<Select.Option key={d} value={d}>
						<UserOutlined style={{ marginRight: 5 }}></UserOutlined>
						<span>{d}</span> <StyledSubName>Whatever</StyledSubName>
					</Select.Option>
				))}
			</Select>
		</StyledFormItem>
	);
};
