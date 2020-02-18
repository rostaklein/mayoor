import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import LogoImage from '../../images/mayoor_logo.svg';
import { Logout } from '../Logout/Logout';
import { UserOverlay } from '../UserOverlay/UserOverlay';
import { MainMenu } from '../MainMenu/MainMenu';
import { LanguageSwitch } from '../LanguageSwitch/LanguageSwitch';

import * as S from './MainWrapper.styles';

export const MainWrapper: React.FC = () => {
	return (
		<Router>
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
						<Route path="/orders/inprogress">In Progress orders</Route>
						<Route path="/orders/new">New Order</Route>
						<Route path="/orders/list">List orders</Route>
						<Route path="/customers/new">New Customer</Route>
						<Route path="/customers/list">List Customers</Route>
					</Switch>
					<Redirect from="/" to="/orders/inprogress" />
				</S.Main>
			</S.BodyWrapper>
		</Router>
	);
};
