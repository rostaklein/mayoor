import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { client } from './ApolloClient';
import { AppContextProvider } from './appContext/context';

ReactDOM.render(
	<ApolloProvider client={client}>
		<AppContextProvider>
			<App />
		</AppContextProvider>
	</ApolloProvider>,
	document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
