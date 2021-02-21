import React from 'react';
import {useSelector} from 'react-redux';
import {getAuthState} from '../../store/selectors';
import {Message} from '../../store/chats/types';

export default function Messages(props: { messages: Message[] }) {
  const username: string = useSelector(getAuthState).user.username;
  return (
    <div>
      {props.messages.map(message =>
        <div key={message.id}>
          <p>{username === message.user.username ? 'you:' : message.user.username + ':'}</p>
          <p>{message.text}</p>
        </div>
      )}
    </div>
  )
}
