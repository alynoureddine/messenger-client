import React from 'react';
import CreateChatModal from './chat/CreateChatModal';
import ChatList from './chat/ChatList';
import AddFriendModal from "./friend/AddFriendModal";
import FriendRequestsList from "./friend/FriendRequestsList";

let counter = 0

export function LeftSection() {
  return (
    <div>
      <div>{ ++counter }</div>

      <CreateChatModal/>
      <AddFriendModal/>
      <FriendRequestsList/>
      <ChatList/>
    </div>
  )
}
