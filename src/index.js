import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { ApolloClient, InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
//import { onError } from 'apollo-link-error'
import { setContext } from 'apollo-link-context';
import { AuthProvider } from './context/auth';


import * as serviceWorker from './serviceWorker';

// Create an http link:
const httpLink = new HttpLink({
	uri: 'http://localhost:5000/graphql',
});

// Create a WebSocket link:
const wsLink = new WebSocketLink({
	uri: `ws://localhost:5000/graphql`,
	options: { reconnect: true },
});

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const authLink = setContext(() => {
	const token = localStorage.getItem('jwtToken');
	return {
	  headers: {
		  Authorization: token ? `Bearer ${token}` : ''
		}
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
		console.log('graphQLErrors', graphQLErrors)
		console.log('networkError', networkError)
	}
});

const wrappedApp = (
	<ApolloProvider client={client}>
		<AuthProvider>
			<App />
		</AuthProvider>
	</ApolloProvider>
);

ReactDOM.render(wrappedApp, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
