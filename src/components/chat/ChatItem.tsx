import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import {Chat} from '../../store/chats/types';
import {useHistory} from "react-router-dom";


export const ChatItem = React.memo((props: {chat: Chat}) => {
  const history = useHistory();

  return (
      <Box display="flex" alignItems="center" onClick={() => history.push(`/${props.chat.id}`)}>
        <Box margin={1}>
          <Skeleton variant="circle">
            <Avatar/>
          </Skeleton>
        </Box>
        <Box width="100%">
          <Typography color="textPrimary">chat {props.chat.users[0].username}</Typography>
          <Typography color="textPrimary">chat {props.chat.id}</Typography>
        </Box>
      </Box>
  )
});

export default ChatItem;
