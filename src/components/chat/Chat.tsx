import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {Dispatch} from 'redux';
import {getChat} from '../../store/chats/actions';
import {getChatsState} from '../../store/selectors';
import {Chat, DraftChat} from '../../store/chats/types';
import ChatFooter from './ChatFooter';
import Messages from "./Messages";

export function ChatSection() {
  const dispatch: Dispatch = useDispatch();
  let id: number = +useParams<{id: string}>().id;
  const chat: Chat | undefined = useSelector(getChatsState).list
    .find((chat: Chat) => chat.id === id || (chat as DraftChat).draftId === id);

  useEffect(() => {
    dispatch(getChat(id));
  }, [dispatch, id]);

  if (!chat) {
    //todo add loading animation here
    return <div></div>;
  }

  const isDraft: boolean = chat.id === (chat as DraftChat).draftId;

  return(
    <div className="chat-wrapper" style={{display: 'flex', flexDirection: 'column', height: '100%'}} id="main">
      <div style={{height :'100%', position: 'relative'}} className="messages-wrapper">
        <div className="messages-container" style={{ height: '100%', position: 'absolute', overflow: 'hidden scroll', width: '100%', flexDirection:'column-reverse'}}>
          <Messages messages={chat.messages ?? []}/>
        </div>
      </div>
      <div className="chat-footer" key={id}>
        <ChatFooter chatId={chat.id} isDraft={isDraft}/>
      </div>
    </div>
  )
}
