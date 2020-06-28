import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { WebSocketLink } from 'apollo-link-ws';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink, Observable, split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { TokenRefreshLink } from 'apollo-link-token-refresh';
import jwt_decode from 'jwt-decode';
import { ThemeProvider } from 'styled-components';

import GlobalStyle from './styles/globalStyles';
import theme from './styles/theme';
import { getAccessToken, setAccessToken } from './utils/accessToken';
import App from './App';

const cache = new InMemoryCache({});

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4000/graphql',
  options: {
    reconnect: true,
  },
});

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include',
});

// requestLink sets the authorization header with the accessToken on the operation
// down the chain of Links
const requestLink = new ApolloLink((operation, forward) => new Observable((observer) => {
  let handle: any;
  Promise.resolve(operation)
    .then((operation) => {
      const accessToken = getAccessToken();
      if (accessToken) {
        operation.setContext({
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        });
      }
    })
    .then(() => {
      handle = forward(operation).subscribe({
        next: observer.next.bind(observer),
        error: observer.error.bind(observer),
        complete: observer.complete.bind(observer),
      });
    })
    .catch(observer.error.bind(observer));

  return () => {
    if (handle) handle.unsubscribe();
  };
}));

const tokenRefreshLink = new TokenRefreshLink({
  accessTokenField: 'accessToken',
  isTokenValidOrUndefined: () => {
    const token = getAccessToken();

    if (!token) {
      return true;
    }

    try {
      const { exp } = jwt_decode(token);
      if (Date.now() >= exp * 1000) {
        return false;
      }
      return true;
    } catch {
      return false;
    }
  },
  fetchAccessToken: () => {
    return fetch('http://localhost:4000/refresh_token', {
      method: 'POST',
      credentials: 'include',
    });
  },
  handleFetch: (accessToken) => {
    setAccessToken(accessToken);
  },
  handleError: (err) => {
    console.warn('Your refresh token is invalid. Try to relogin');
    console.error(err);
  },
});
// additive link composition
const linkChain = ApolloLink.from([
  tokenRefreshLink,
  requestLink,
  httpLink,
]);

// this determines the Link to use based on the GraphQL operation
const link = split(
  ({ query }) => {
    const defenition = getMainDefinition(query);

    return defenition.kind === 'OperationDefinition' && defenition.operation === 'subscription';
  },
  wsLink,
  linkChain,
);

const client = new ApolloClient({
  link,
  cache,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <>
        <App />
        <GlobalStyle />
      </>
    </ThemeProvider>
  </ApolloProvider>,
  document.getElementById('root'),
);
