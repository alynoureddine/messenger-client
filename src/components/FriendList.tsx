import React, { useEffect } from 'react';

import { GridList, GridListTile } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { getFriends } from '../store/friends/actions';
import { Friend, FriendsState, GetFriendsAction } from '../store/friends/types';
import { getFriendsState } from '../store/selectors';
import AvatarTitleSkeleton from './AvatarTitleSkeleton';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { Dispatch } from 'redux';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    item: {
    },
  }),
);

export function FriendList() {
  const classes = useStyles();
  const dispatch: Dispatch<GetFriendsAction> = useDispatch();
  const friendsState: FriendsState = useSelector(getFriendsState);

  useEffect(() => {
    dispatch(getFriends());
  }, [dispatch]);

  return (
    <GridList cols={1} cellHeight="auto">
      {
        friendsState.friends.length < 1 ?
          new Array(3).fill(3).map(() => <GridListTile><AvatarTitleSkeleton/></GridListTile>) :
          friendsState.friends.map((friend: Friend) =>
            <GridListTile className={classes.item} key={friend.id}>
              <Box display="flex" alignItems="center">
                <Box margin={1}>
                  <Skeleton variant="circle">
                    <Avatar/>
                  </Skeleton>
                </Box>
                <Box width="100%">
                  <Typography color="textPrimary">chat {friend.firstName}</Typography>
                </Box>
              </Box>
            </GridListTile>
          )
      }
    </GridList>
  )
}
