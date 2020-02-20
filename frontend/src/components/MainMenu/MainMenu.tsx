import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled';

import { Colors } from '../../themeVariables';

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
	return (
		<StyledMenu>
			<li>
				<CategoryName>{t('Orders')}</CategoryName>
				<LinkItem icon="sync" name={t('In Progress')} to={'/orders/inprogress'} />
				<LinkItem icon="plus-circle" name={t('Add order')} to={'/orders/new'} />
				<LinkItem icon="file-search" name={t('List orders')} to={'/orders/list'} />
			</li>
			<li>
				<CategoryName>{t('Customers')}</CategoryName>
				<LinkItem icon="user-add" name={t('Add customer')} to={'/customers/new'} />
				<LinkItem icon="team" name={t('Customers')} to={'/customers/list'} />
			</li>
		</StyledMenu>
	);
};
