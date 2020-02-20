import React from 'react';
import styled from '@emotion/styled';
import { NavLink, NavLinkProps } from 'react-router-dom';
import { Icon } from 'antd';

import { Colors } from '../../themeVariables';

const StyledIcon = styled(Icon)`
	margin-right: 10px;
`;

const MenuLinkItem = styled(NavLink)<NavLinkProps<unknown>>`
	width: 100%;
	display: flex;
	align-items: center;
	color: inherit;
	text-decoration: none;
	padding: 12px 24px;
	margin: 2px 0;
	font-weight: 600;
	border-right: solid transparent 5px;
	transition: all 0.2s;
	color: ${Colors.DARK_GRAY3};
	&.active {
		background: ${Colors.LIGHT_GRAY4};
		border-color: ${Colors.BLUE4};
	}
	&:hover {
		background: ${Colors.LIGHT_GRAY4};
		color: inherit;
		text-decoration: none;
	}
`;

interface Props {
	icon: string;
	name: string;
	to: NavLinkProps<unknown>['to'];
}

export const LinkItem: React.FC<Props> = ({ icon, name, to }) => {
	return (
		<MenuLinkItem to={to}>
			<StyledIcon type={icon} />
			{name}
		</MenuLinkItem>
	);
};
