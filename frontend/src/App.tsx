import React from 'react';
import { useQuery } from 'react-apollo';
import { Spinner } from '@blueprintjs/core';

import { LoginForm } from './components/login/LoginForm';
import { ME_QUERY } from './components/login/queries';
import { MeQuery } from './__generated__/types';
import { CenteredWrapper } from './components/CenteredWrapper/CenteredWrapper';

const App: React.FC = () => {
	const { data, called, loading } = useQuery<MeQuery>(ME_QUERY);
	if (loading || !called) {
		return (
			<CenteredWrapper>
				<Spinner size={50} />
			</CenteredWrapper>
		);
	}

	if (data?.me) {
		return <>{JSON.stringify(data.me)}</>;
	}

	return <LoginForm />;
};

export default App;
