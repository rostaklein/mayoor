import React from 'react';

import LogoImage from '../../images/mayoor_logo.svg';
import { Logout } from '../Logout/Logout';
import { UserOverlay } from '../UserOverlay/UserOverlay';
import { MainMenu } from '../MainMenu/MainMenu';
import { LanguageSwitch } from '../LanguageSwitch/LanguageSwitch';

import * as S from './MainWrapper.styles';

export const MainWrapper: React.FC = () => {
	return (
		<S.BodyWrapper>
			<S.Aside>
				<S.LogoWrapper>
					<S.Logo src={LogoImage} />
				</S.LogoWrapper>
				<MainMenu />
			</S.Aside>
			<S.Main>
				<S.StyledNavbar>
					<UserOverlay />
					<LanguageSwitch />
					<Logout />
				</S.StyledNavbar>
				Main
			</S.Main>
		</S.BodyWrapper>
	);
};
