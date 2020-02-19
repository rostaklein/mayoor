import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';

const httpLink = new HttpLink({
	uri: process.env.NODE_ENV === 'development' ? 'http://localhost:4444/graphql' : '/graphql',
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
	if (graphQLErrors)
		graphQLErrors.forEach(({ message, locations, path }) =>
			console.log(
				`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
			),
		);
	if (networkError) console.log(`[Network error]: ${networkError}`);
});

const authLink = new ApolloLink((operation, forward) => {
	const token = localStorage.getItem('auth-token');

	operation.setContext({
		headers: {
			Authorization: token ? `Bearer ${token}` : '',
		},
	});

	return forward(operation);
});

const link = ApolloLink.from([authLink, errorLink, httpLink]);

const cache = new InMemoryCache();

export const client = new ApolloClient({
	link,
	cache,
});
