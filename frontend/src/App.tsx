import React from 'react';
import { ApolloProvider } from 'react-apollo';

import { LoginForm } from './components/login/LoginForm';
import { client } from './ApolloClient';

const App: React.FC = () => {
	return (
		<ApolloProvider client={client}>
			<LoginForm />
		</ApolloProvider>
	);
};

export default App;
