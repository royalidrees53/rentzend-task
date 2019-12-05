import React from 'react';

import { useQuery } from '@apollo/react-hooks';
import { isEmpty, map } from 'lodash';
import { Typography, Container } from '@material-ui/core';

import AgentCard from './AgentCard';
import { GET_AGENTS } from '../../graphql/queries';

const AgentList = () => {
  const { loading, error, data } = useQuery(GET_AGENTS);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  return (
    <Container>
      <Typography className="sub-heading" variant="h4" component="h4">
        Agents In System
        </Typography>
      <div className="agents">
        {
          isEmpty(data.agents) ? (
            <div>No Agents Present</div>
          ) : map(data.agents, (agentData, index) => {
            return <AgentCard key={index} agent={agentData} />
          })
        }
      </div>
    </Container>
  )
};

export default AgentList;
