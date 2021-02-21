import React, {useEffect} from 'react';

import {GridList, GridListTile} from '@material-ui/core';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {useDispatch, useSelector} from 'react-redux';
import {Friend, FriendsState, GetFriendsAction} from '../../store/friends/types';
import {getFriendsState} from '../../store/selectors';
import AvatarTitleSkeleton from '../AvatarTitleSkeleton';
import Typography from '@material-ui/core/Typography';
import {Dispatch} from 'redux';
import FriendItem from './FriendItem';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    item: {},
  }),
);

export function FriendList() {
  const classes = useStyles();
  const dispatch: Dispatch<GetFriendsAction> = useDispatch();
  const friendsState: FriendsState = useSelector(getFriendsState);

  useEffect(() => {
    // dispatch(getFriends());
  }, [dispatch]);

  return (
    <GridList cols={1} cellHeight="auto">
      {
        friendsState.pending
          ? new Array(3).fill(3).map(() => <GridListTile><AvatarTitleSkeleton/></GridListTile>) :
          friendsState.friends.length < 1
            ? <GridListTile className={classes.item}>
                <Typography color="textPrimary">no friends</Typography>
              </GridListTile>
            : friendsState.friends.map((friend: Friend) =>
              <GridListTile className={classes.item} key={friend.id}>
                <FriendItem friend={friend}/>
              </GridListTile>
            )
      }
    </GridList>
  )
}
