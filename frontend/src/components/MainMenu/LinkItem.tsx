import React from 'react';
import { IconName, Colors, Icon } from '@blueprintjs/core';
import styled from '@emotion/styled';

const StyledIcon = styled(Icon)`
	margin-right: 10px;
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

interface Props {
	icon: IconName;
	name: string;
}

export const LinkItem: React.FC<Props> = ({ icon, name }) => {
	return (
		<MenuLinkItem>
			<StyledIcon icon={icon} color={Colors.GRAY3} />
			{name}
		</MenuLinkItem>
	);
};
