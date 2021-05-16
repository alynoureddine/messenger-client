import React from 'react';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import {Friend} from '../../store/friends/types';

export default function FriendItem({ friend, handleFriendClick }: { friend: Friend, handleFriendClick: (friendId: number) => void }) {
  return (
    <Box display="flex" alignItems="center" onClick={() => handleFriendClick(friend.id)}>
      <Box margin={1}>
        <Skeleton variant="circle">
          <Avatar/>
        </Skeleton>
      </Box>
      <Box width="100%">
        <Typography color="textPrimary">{`${friend.firstName} ${friend.lastName}`}</Typography>
      </Box>
    </Box>
  )
}
