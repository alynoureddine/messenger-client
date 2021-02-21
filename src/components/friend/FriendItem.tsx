import React from 'react';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import {Friend} from '../../store/friends/types';
import {useDispatch, useSelector} from 'react-redux';
import {createChat} from '../../store/chats/actions';
import {getAuthState, getChatsState} from '../../store/selectors';
import {Chat, ChatsState} from '../../store/chats/types';
import {useHistory} from 'react-router-dom';
import {AuthState} from "../../store/auth/types";
import {Dispatch} from "redux";

function createDraftId(): number {
  return Date.now();
}

export default function FriendItem(props: {friend: Friend}) {
  const dispatch: Dispatch = useDispatch();
  const history = useHistory();

  const chatState: ChatsState = useSelector(getChatsState);
  const authState: AuthState = useSelector(getAuthState);

  const handleFriendClick = () => {
    let chat: Chat | undefined = chatState.list.find((chat: Chat) =>
      chat.users.length === 2
      && (chat.users[0].id === props.friend.id || chat.users[1].id === props.friend.id)
    );

    if (chat) {
      history.push(`/${chat.id}`);

      return;
    }

    const draftId: number = createDraftId();

    dispatch(createChat(
      {
        id: draftId,
        users: [props.friend, authState.user as Friend],
        draftId: draftId,
      },
      props.friend.id,
    ));

    history.push(`/${draftId}`);
  };

  return (
    <Box display="flex" alignItems="center" onClick={handleFriendClick}>
      <Box margin={1}>
        <Skeleton variant="circle">
          <Avatar/>
        </Skeleton>
      </Box>
      <Box width="100%">
        <Typography color="textPrimary">{`${props.friend.firstName} ${props.friend.lastName}`}</Typography>
      </Box>
    </Box>
  )
}
