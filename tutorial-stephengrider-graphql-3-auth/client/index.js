import React from 'react';
import ReactDOM from 'react-dom';

import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

import { Router, hashHistory, Route, IndexRoute } from 'react-router';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import App from './components/App';
import Dashboard from './components/Dashboard';
import requiredAuth from './components/requireAuth';

const networkInterface = createNetworkInterface({
  uri: '/graphql', //apollo client to still use graphql endpoint
  opts: {
    credentials: 'same-origin' //send cookies with outgoing request to backend server
  }
});

const client = new ApolloClient({
  networkInterface,
  dataIdFromObject: (o) => o.id
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <Route path="login" component={LoginForm} />
          <Route path="signup" component={SignupForm} />
          <Route path="dashboard" component={requiredAuth(Dashboard)} />
        </Route>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector('#root'));
