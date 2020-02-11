import React from 'react';
import styled from '@emotion/styled';
import { Colors, Button } from '@blueprintjs/core';

import LogoImage from '../../images/mayoor_logo.svg';
import { useAppState } from '../../appContext/context';
import { Logout } from '../Logout/Logout';

const BodyWrapper = styled.main`
	display: flex;
	height: 100%;
`;

const Aside = styled.aside`
	flex: 1 0 0;
	max-width: 230px;
	background-color: ${Colors.LIGHT_GRAY2};
`;

const Logo = styled.img`
	width: 220px;
	height: 50px;
`;

const LogoWrapper = styled.div`
	width: 100%;
	text-align: center;
	padding: 15px 0;
`;

const Main = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
`;

const StyledNavbar = styled.header`
	padding: 5px 15px;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	background-color: ${Colors.LIGHT_GRAY4};
	box-shadow: none;
`;

export const MainWrapper: React.FC = () => {
	const { currentUser } = useAppState();
	return (
		<BodyWrapper>
			<Aside>
				<LogoWrapper>
					<Logo src={LogoImage} />
				</LogoWrapper>
			</Aside>
			<Main>
				<StyledNavbar>
					<Button minimal icon="user" text={currentUser?.name} />
					<Logout />
				</StyledNavbar>
				Main
			</Main>
		</BodyWrapper>
	);
};
