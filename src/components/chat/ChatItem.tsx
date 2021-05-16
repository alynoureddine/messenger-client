import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import {Chat} from '../../store/chats/types';
import {useHistory} from "react-router-dom";


export const ChatItem = React.memo((props: {chat: Chat, chatLabel: string }) => {
  const history = useHistory();

  return (
      <Box display="flex" alignItems="center" onClick={() => {
        history.push(`/chats/${props.chat.id}`);
      }}>
        <Box margin={1}>
          <Skeleton variant="circle">
            <Avatar/>
          </Skeleton>
        </Box>
        <Box width="100%">
          <Typography color="textPrimary">{props.chatLabel}</Typography>
        </Box>
      </Box>
  )
});

export default ChatItem;
