import React from 'react';
import { useQuery } from 'react-apollo';
import { Spinner } from '@blueprintjs/core';

import { LoginForm } from './components/Login/LoginForm';
import { ME_QUERY } from './components/login/queries';
import { MeQuery } from './__generated__/types';
import { CenteredWrapper } from './components/CenteredWrapper/CenteredWrapper';
import { useAppDispatch, useAppState } from './appContext/context';

const App: React.FC = () => {
	const dispatch = useAppDispatch();
	const { currentUser } = useAppState();

	const { called, loading } = useQuery<MeQuery>(ME_QUERY, {
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
		return <>{JSON.stringify(currentUser)}</>;
	}

	return <LoginForm />;
};

export default App;
