import React from 'react';

import { List } from '@material-ui/core';

import Form from './Form';
import AgentList from './AgentList';

const Agents = () => {
  return (
    <List>
      <div className="agents-form">
        <Form />
      </div>
      <AgentList />
    </List>
  )
};

export default Agents;
