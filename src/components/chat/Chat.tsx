import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {Dispatch} from 'redux';
import {createDraftMessage, emitMessage, getChat} from '../../store/chats/actions';
import {getChatsState} from '../../store/selectors';
import {Chat, DraftChat, Message} from '../../store/chats/types';
import {ChatView} from "./ChatView";

export function ChatSection() {
  const dispatch: Dispatch = useDispatch();
  const isChatPending: boolean = useSelector(getChatsState).pending;
  let id: number = +useParams<{id: string}>().id;

  useEffect(() => {
      if (!isChatPending) dispatch(getChat(id as number));
  }, [dispatch, id, isChatPending]);

  const chat: Chat | undefined = useSelector(getChatsState).list
    .find((chat: Chat) => chat.id === id || (chat as DraftChat).draftId === id);

  if (!chat) {
    return <div></div> //todo add loading animation
  }

  const isDraft: boolean = chat.id === (chat as DraftChat).draftId;

  let sendMessageAction: (message: Message) => void = (message: Message) => {
      if (isDraft) {
        dispatch(createDraftMessage({ ...message, isDraft: true }, chat.id))
      } else {
        dispatch(emitMessage(message, chat.id));
      }
  }

  return(
    <ChatView messages={chat.messages} sendMessageAction={sendMessageAction}/>
  )
}
