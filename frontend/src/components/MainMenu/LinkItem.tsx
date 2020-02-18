import React from 'react';
import { IconName, Colors, Icon } from '@blueprintjs/core';
import styled from '@emotion/styled';
import { NavLink, NavLinkProps } from 'react-router-dom';

const StyledIcon = styled(Icon)`
	margin-right: 10px;
`;

const MenuLinkItem = styled(NavLink)<NavLinkProps<unknown>>`
	width: 100%;
	display: inline-block;
	color: inherit;
	text-decoration: none;
	padding: 12px 24px;
	margin: 2px 0;
	font-weight: 600;
	border-right: solid transparent 5px;
	transition: all 0.2s;
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
	icon: IconName;
	name: string;
	to: NavLinkProps<unknown>['to'];
}

export const LinkItem: React.FC<Props> = ({ icon, name, to }) => {
	return (
		<MenuLinkItem to={to}>
			<StyledIcon icon={icon} color={Colors.GRAY3} />
			{name}
		</MenuLinkItem>
	);
};
