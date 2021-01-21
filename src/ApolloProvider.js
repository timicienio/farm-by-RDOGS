import React from 'react';
import App from './App';

import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from '@apollo/react-hooks';
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
//import { onError } from 'apollo-link-error'
import { setContext } from 'apollo-link-context';
import { AuthProvider } from './context/auth';

const localhost = false;

// Create an http link:
const httpLink = new HttpLink({
	uri: localhost
		? 'http://localhost:5000'
		: 'https://rdogs-farm.herokuapp.com/',
});

// Create a WebSocket link:
const wsLink = new WebSocketLink({
	uri: localhost
		? `ws://localhost:5000/graphql`
		: `wss://rdogs-farm.herokuapp.com/graphql`,
	options: { reconnect: true },
});

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const authLink = setContext(() => {
	const token = localStorage.getItem('jwtToken');
	return {
		headers: {
			Authorization: token ? `Bearer ${token}` : '',
		},
	};
});
const link = split(
	// split based on operation type
	({ query }) => {
		const definition = getMainDefinition(query);
		return (
			definition.kind === 'OperationDefinition' &&
			definition.operation === 'subscription'
		);
	},
	wsLink,
	authLink.concat(httpLink)
);

const client = new ApolloClient({
	link,
	cache: new InMemoryCache().restore({}),
	onError: ({ networkError, graphQLErrors }) => {
		// console.log('graphQLErrors', graphQLErrors);
		// console.log('networkError', networkError);
	},
});

export default (
	<ApolloProvider client={client}>
		<AuthProvider>
			<App />
		</AuthProvider>
	</ApolloProvider>
);
