import React, { Suspense } from 'react';
import { useQuery } from 'react-apollo';
import { Spinner, Callout } from '@blueprintjs/core';
import { hot } from 'react-hot-loader/root';
import { useTranslation } from 'react-i18next';

import { LoginForm } from './components/Login/LoginForm';
import { ME_QUERY } from './components/Login/queries';
import { MeQuery } from './__generated__/types';
import { CenteredWrapper } from './components/CenteredWrapper/CenteredWrapper';
import { useAppDispatch, useAppState } from './appContext/context';
import { MainWrapper } from './components/MainWrapper/MainWrapper';

const CenteredSpinner: React.FC = () => (
	<CenteredWrapper>
		<Spinner size={50} />
	</CenteredWrapper>
);

const App: React.FC = () => {
	const dispatch = useAppDispatch();
	const { currentUser } = useAppState();
	const { t } = useTranslation();

	const { called, loading, error } = useQuery<MeQuery>(ME_QUERY, {
		onCompleted: (data) => {
			dispatch({ type: 'SET_CURRENT_USER', user: { ...data.me } });
		},
	});

	if (loading || !called) {
		return <CenteredSpinner />;
	}

	if (currentUser) {
		return <MainWrapper />;
	}

	return (
		<Suspense fallback={<CenteredSpinner />}>
			{error?.networkError && (
				<Callout intent="danger">{t('Could not connect to the backend server')}</Callout>
			)}
			<LoginForm />
		</Suspense>
	);
};

export default hot(App);
