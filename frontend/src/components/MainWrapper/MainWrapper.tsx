import React, { useEffect } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import LogoImage from '../../images/mayoor_logo.svg';
import { Logout } from '../Logout/Logout';
import { UserOverlay } from '../UserOverlay/UserOverlay';
import { MainMenu } from '../MainMenu/MainMenu';
import { LanguageSwitch } from '../LanguageSwitch/LanguageSwitch';
import { NewCustomer } from '../NewCustomer/NewCustomer';

import * as S from './MainWrapper.styles';

type RouteConfig = {
	path: string;
	title: string;
	Component?: React.ReactElement;
};

export const MainWrapper: React.FC = () => {
	const { t, i18n } = useTranslation();
	const location = useLocation();

	const routes: RouteConfig[] = [
		{ path: '/orders/inprogress', title: t('In Progress') },
		{ path: '/orders/new', title: t('Add order') },
		{ path: '/orders/list', title: t('List orders') },
		{ path: '/customers/new', title: t('Add customer'), Component: <NewCustomer /> },
		{ path: '/customers/list', title: t('Customers') },
	];

	useEffect(() => {
		const currentRoute = routes.find((route) => route.path === location.pathname);

		if (currentRoute) {
			document.title = `${currentRoute.title} | mayoor`;
		}
	}, [location, i18n.language]);

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
					{routes.map(({ path, title, Component }) => (
						<Route path={path} key={path}>
							<S.PageTitle>{title}</S.PageTitle>
							{Component}
						</Route>
					))}
					<Redirect from="/" to="/orders/inprogress" />
				</Switch>
			</S.Main>
		</S.BodyWrapper>
	);
};
