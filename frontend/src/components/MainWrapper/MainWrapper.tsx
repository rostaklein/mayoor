import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import LogoImage from '../../images/mayoor_logo.svg';
import { Logout } from '../Logout/Logout';
import { UserOverlay } from '../UserOverlay/UserOverlay';
import { MainMenu } from '../MainMenu/MainMenu';
import { LanguageSwitch } from '../LanguageSwitch/LanguageSwitch';

import * as S from './MainWrapper.styles';

export const MainWrapper: React.FC = () => {
	const { t } = useTranslation();
	const location = useLocation();

	const routes = [
		{ path: '/orders/inprogress', title: t('In Progress') },
		{ path: '/orders/new', title: t('Add order') },
		{ path: '/orders/list', title: t('List orders') },
		{ path: '/customers/new', title: t('Add customer') },
		{ path: '/customers/list', title: t('Customers') },
	];

	useEffect(() => {
		const currentRoute = routes.find((route) => route.path === location.pathname);

		if (currentRoute) {
			document.title = `${currentRoute.title} | mayoor`;
		}
	}, [location]);

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
				<Switch>
					{routes.map(({ path, title }) => (
						<Route path={path} key={path}>
							<S.PageTitle>{title}</S.PageTitle>
						</Route>
					))}
					<Redirect from="/" to="/orders/inprogress" />
				</Switch>
			</S.Main>
		</S.BodyWrapper>
	);
};
