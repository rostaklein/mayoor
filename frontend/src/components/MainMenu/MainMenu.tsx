import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled';
import { Colors, Icon } from '@blueprintjs/core';

const StyledIcon = styled(Icon)`
	margin-right: 10px;
	opacity: 0.3;
`;

const StyledMenu = styled.ul`
	list-style: none;
	margin: 0;
	padding: 0;
`;

const MenuLinkItem = styled.a`
	width: 100%;
	display: inline-block;
	color: inherit;
	text-decoration: none;
	padding: 12px 24px;
	margin: 2px 0;
	font-weight: 600;
	transition: all 0.2s;
	/* background: ${Colors.LIGHT_GRAY4}; */
	&:hover {
		background: ${Colors.LIGHT_GRAY4};
		color: inherit;
		text-decoration: none;
	}
`;

export const MainMenu: React.FC = () => {
	const { t } = useTranslation();
	return (
		<StyledMenu>
			<li>
				<MenuLinkItem>
					<StyledIcon icon="automatic-updates" />
					{t('In Progress')}
				</MenuLinkItem>
				<MenuLinkItem>
					<StyledIcon icon="add" />
					{t('Add order')}
				</MenuLinkItem>
				<MenuLinkItem>
					<StyledIcon icon="horizontal-bar-chart" />
					{t('List orders')}
				</MenuLinkItem>
				<MenuLinkItem>
					<StyledIcon icon="people" />
					{t('Customers')}
				</MenuLinkItem>
			</li>
		</StyledMenu>
	);
};
