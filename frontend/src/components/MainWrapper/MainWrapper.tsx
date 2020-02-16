import React from 'react';
import styled from '@emotion/styled';
import { Colors } from '@blueprintjs/core';

import LogoImage from '../../images/mayoor_logo.svg';
import { Logout } from '../Logout/Logout';
import { UserOverlay } from '../UserOverlay/UserOverlay';
import { MainMenu } from '../MainMenu/MainMenu';

const BodyWrapper = styled.main`
	display: flex;
	height: 100%;
`;

const Aside = styled.aside`
	flex: 1 0 0;
	max-width: 230px;
	background-color: ${Colors.LIGHT_GRAY5};
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
	position: relative;
	z-index: 1;
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
	return (
		<BodyWrapper>
			<Aside>
				<LogoWrapper>
					<Logo src={LogoImage} />
				</LogoWrapper>
				<MainMenu />
			</Aside>
			<Main>
				<StyledNavbar>
					<UserOverlay />
					<Logout />
				</StyledNavbar>
				Main
			</Main>
		</BodyWrapper>
	);
};
