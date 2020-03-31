import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled';
import {
	PlusCircleOutlined,
	FileSearchOutlined,
	UserAddOutlined,
	TeamOutlined,
	FileTextOutlined,
	BgColorsOutlined,
	HighlightOutlined,
} from '@ant-design/icons';

import { Colors } from '../../themeVariables';
import { useAppState } from '../../appContext/context';
import { UserRole } from '../../__generated__/types';

import { LinkItem } from './LinkItem';

const StyledMenu = styled.ul`
	list-style: none;
	margin: 0;
	padding: 0;
	> li {
		&:not(:first-of-type) {
			margin-top: 10px;
		}
	}
`;

const CategoryName = styled.div`
	display: block;
	font-size: 12px;
	font-weight: 700;
	text-transform: uppercase;
	color: ${Colors.GRAY4};
	padding: 5px 15px;
`;

export const MainMenu: React.FC = () => {
	const { t } = useTranslation();
	const { currentUser } = useAppState();
	return (
		<StyledMenu>
			<li>
				<CategoryName>{t('Orders')}</CategoryName>
				<LinkItem icon={<PlusCircleOutlined />} name={t('Add order')} to={'/orders/new'} />
				<LinkItem
					icon={<FileSearchOutlined />}
					name={t('List orders')}
					to={'/orders/list'}
				/>
				<LinkItem
					icon={<BgColorsOutlined />}
					name={t('To be printed')}
					to={'/orders/print'}
				/>
				<LinkItem
					icon={<HighlightOutlined />}
					name={t('Waiting for production')}
					to={'/orders/production'}
				/>
			</li>
			<li>
				<CategoryName>{t('Customers')}</CategoryName>
				<LinkItem
					icon={<UserAddOutlined />}
					name={t('Add customer')}
					to={'/customers/new'}
				/>
				<LinkItem icon={<TeamOutlined />} name={t('Customers')} to={'/customers/list'} />
			</li>
			{currentUser?.role === UserRole.EXECUTIVE && (
				<li>
					<CategoryName>{t('Administration')}</CategoryName>
					<LinkItem icon={<FileTextOutlined />} name={t('Material')} to={'/materials'} />
					<LinkItem icon={<TeamOutlined />} name={t('Users')} to={'/users'} />
				</li>
			)}
		</StyledMenu>
	);
};
