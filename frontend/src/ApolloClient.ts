import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const httpLink = new HttpLink({
	uri: 'http://localhost:4444',
});

const authLink = new ApolloLink((operation, forward) => {
	operation.setContext((context: Record<string, string>) => {
		const token = localStorage.getItem('auth-token');
		if (token) {
			context['Authorization'] = token;
		}
		return context;
	});

	return forward(operation);
});

const link = ApolloLink.from([authLink, httpLink]);

const cache = new InMemoryCache();

export const client = new ApolloClient({
	link,
	cache,
});
