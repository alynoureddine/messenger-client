import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Skeleton from '@material-ui/lab/Skeleton';

export default function AvatarTitleSkeleton() {
  return (
    <Box display="flex" alignItems="center">
      <Box margin={1}>
        <Skeleton variant="circle">
          <Avatar/>
        </Skeleton>
      </Box>
      <Box width="100%">
        <Skeleton width="100%">
          <Typography>.</Typography>
        </Skeleton>
      </Box>
    </Box>
  );
}
