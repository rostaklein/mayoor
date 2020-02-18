import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled';
import { Colors, Icon } from '@blueprintjs/core';

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
				<LinkItem
					icon="automatic-updates"
					name={t('In Progress')}
					to={'/orders/inprogress'}
				/>
				<LinkItem icon="add" name={t('Add order')} to={'/orders/new'} />
				<LinkItem icon="horizontal-bar-chart" name={t('List orders')} to={'/orders/list'} />
			</li>
			<li>
				<CategoryName>{t('Customers')}</CategoryName>
				<LinkItem icon="new-person" name={t('Add customer')} to={'/customers/new'} />
				<LinkItem icon="people" name={t('Customers')} to={'/customers/list'} />
			</li>
		</StyledMenu>
	);
};
