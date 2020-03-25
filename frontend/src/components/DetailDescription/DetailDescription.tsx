import React from 'react';
import styled from '@emotion/styled';
import { Descriptions } from 'antd';
import { UserOutlined, CalendarOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import { useDateFormatter } from '../../locales/useDateFormatter';

const StyledDescriptions = styled(Descriptions)`
	padding: 0 35px;
	.ant-descriptions-item-label,
	.ant-descriptions-item-content {
		font-size: 12px;
	}
	.anticon {
		margin-right: 3px;
	}
`;

type Props = {
	createdByName?: string | null;
	createdAt?: string;
	updatedAt?: string;
};

export const DetailDescription: React.FC<Props> = ({ createdByName, createdAt, updatedAt }) => {
	const { t } = useTranslation();
	const { f } = useDateFormatter();
	return (
		<StyledDescriptions>
			<Descriptions.Item label={t('Created By')}>
				<UserOutlined />
				{createdByName}
			</Descriptions.Item>
			<Descriptions.Item label={t('Created At')}>
				{createdAt && (
					<>
						<CalendarOutlined /> {f(createdAt, 'datetime')}
					</>
				)}
			</Descriptions.Item>
			<Descriptions.Item label={t('Last Updated At')}>
				{updatedAt && (
					<>
						<CalendarOutlined /> {f(updatedAt, 'datetime')}
					</>
				)}
			</Descriptions.Item>
		</StyledDescriptions>
	);
};
