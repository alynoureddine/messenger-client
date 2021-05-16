import React from 'react';
import {Message} from '../../store/chats/types';
import ChatFooter from './ChatFooter';
import Messages from "./Messages";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() =>({
  Chat: {

  }
}));

export function ChatView(props: { messages: Message[], sendMessageAction: (message: Message) => void }) {
  return(
    <div className="chat-wrapper" style={{display: 'flex', flexDirection: 'column', height: '100%'}} id="main">
      {/*<div style={{height :'100%', position: 'relative'}} className="messages-wrapper">*/}
      {/*  <div className="messages-container" style={{ height: '100%', position: 'absolute', overflow: 'hidden scroll', width: '100%', flexDirection:'column-reverse'}}>*/}
          <Messages messages={props.messages}/>
      {/*  </div>*/}
      {/*</div>*/}

      <div className="chat-footer">
        <ChatFooter sendMessageAction={props.sendMessageAction}/>
      </div>
    </div>
  )
}
