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
				<LinkItem icon="automatic-updates" name={t('In Progress')} />
				<LinkItem icon="add" name={t('Add order')} />
				<LinkItem icon="horizontal-bar-chart" name={t('List orders')} />
			</li>
			<li>
				<CategoryName>{t('Customers')}</CategoryName>
				<LinkItem icon="new-person" name={t('Add customer')} />
				<LinkItem icon="people" name={t('Customers')} />
			</li>
		</StyledMenu>
	);
};
