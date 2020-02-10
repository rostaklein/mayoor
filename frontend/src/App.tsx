import React from 'react';
import { useQuery } from 'react-apollo';
import { Spinner, Callout } from '@blueprintjs/core';

import { LoginForm } from './components/Login/LoginForm';
import { ME_QUERY } from './components/Login/queries';
import { MeQuery } from './__generated__/types';
import { CenteredWrapper } from './components/CenteredWrapper/CenteredWrapper';
import { useAppDispatch, useAppState } from './appContext/context';
import { Logout } from './components/Logout/Logout';

const App: React.FC = () => {
	const dispatch = useAppDispatch();
	const { currentUser } = useAppState();

	const { called, loading, error } = useQuery<MeQuery>(ME_QUERY, {
		onCompleted: (data) => {
			dispatch({ type: 'SET_CURRENT_USER', user: { ...data.me } });
		},
	});

	if (loading || !called) {
		return (
			<CenteredWrapper>
				<Spinner size={50} />
			</CenteredWrapper>
		);
	}

	if (currentUser) {
		return (
			<>
				{JSON.stringify(currentUser)} <Logout />
			</>
		);
	}

	return (
		<>
			{error?.networkError && (
				<Callout intent="danger">Could not connect to the backend server</Callout>
			)}
			<LoginForm />
		</>
	);
};

export default App;
