import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getChatsState} from '../../store/selectors';
import {Chat, ChatsState} from '../../store/chats/types';
import {GridList, GridListTile} from '@material-ui/core';
import AvatarTitleSkeleton from '../AvatarTitleSkeleton';
import Typography from '@material-ui/core/Typography';
import ChatItem from './ChatItem';
import {getChatList} from "../../store/chats/actions";
import {Dispatch} from "redux";

export default function ChatList() {
  const chatsState: ChatsState = useSelector(getChatsState);
  const dispatch: Dispatch = useDispatch();

  useEffect(() => {
    dispatch(getChatList());
  }, [dispatch])

  return (
    <GridList cols={1} cellHeight="auto">
      {
        chatsState.pending
          ? new Array(3).fill(3).map((_: number, index: number) => <GridListTile key={index}><AvatarTitleSkeleton/></GridListTile>) :
          chatsState.list.length < 1
            ? <GridListTile >
              <Typography color="textPrimary">no chats</Typography>
            </GridListTile>
            : chatsState.list.map((chat: Chat) =>
              <GridListTile key={chat.id}>
                <ChatItem chat={chat}/>
              </GridListTile>
            )
      }
    </GridList>
  )
}
