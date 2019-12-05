import React from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Person from '@material-ui/icons/Person';

const Agent = ({ agent }) => {
  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar>
          <Person />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={agent.name}
        secondary={
          <React.Fragment>
            <Typography
              component="span"
              variant="body2"
              color="textPrimary"
            >
              {agent.email}
            </Typography>
            {` — ${agent.address}`}
          </React.Fragment>
        }
      />
    </ListItem>
  );
};

export default Agent;
