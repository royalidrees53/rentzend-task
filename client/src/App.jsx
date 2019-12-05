import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import apollo from './graphql/apollo_client';
import Agents from './components/agents';

import './App.css';

const App = () => (
  <ApolloProvider client={apollo}>
    <div className="main-app">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Agents} />
        </Switch>
      </BrowserRouter>
    </div>
  </ApolloProvider>
);

export default App;
