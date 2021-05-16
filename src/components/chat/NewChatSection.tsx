import React from 'react';
import {useHistory, useParams} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {Dispatch} from 'redux';
import {createChat} from '../../store/chats/actions';
import {getAuthState, getFriendsState} from '../../store/selectors';
import {Message} from '../../store/chats/types';
import {Friend} from "../../store/friends/types";
import {ChatView} from "./ChatView";
import {AuthState} from "../../store/auth/types";

function createDraftId(): number {
  return Date.now();
}

export function NewChatSection() {
  const dispatch: Dispatch = useDispatch();
  const history = useHistory();
  const friendId: number = +useParams<{friendId: string}>().friendId;
  const friend: Friend | undefined = useSelector(getFriendsState).friends
    .find((friend: Friend) => friend.id === friendId);
  const authState: AuthState = useSelector(getAuthState);

  if (!friend) {
    return <div></div>; //todo add loading animation
  }

  const draftId: number = createDraftId();
  let sendMessageAction: (message: Message) => void = (message: Message) => {
      dispatch(createChat(
        {
          id: draftId,
          users: [friend, authState.user as Friend],
          draftId: draftId,
          messages: [message],
        },
        friend.id,
      ));

      history.replace(`/chats/${draftId}`)
    }

  return(
    <ChatView messages={[]} sendMessageAction={sendMessageAction} />
  )
}
