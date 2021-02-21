import {all, fork} from 'redux-saga/effects'
import {watchGetLoggedInUser, watchLogin, watchRegister} from './auth/sagas';
import {watchCreateFriendRequest, watchGetFriendRequests, watchGetFriends} from './friends/sagas';
import {
  watchCreateChat,
  watchEmitDraftMessageEvents,
  watchEmitMessageEvents,
  watchGetChat,
  watchGetChatList,
  watchIncomingChatEvents,
  watchIncomingMessageEvents
} from './chats/sagas';
import {watchGetUsers} from "./users/sagas";

export default function* rootSaga() {
  yield all([
    fork(watchRegister),
    fork(watchLogin),
    fork(watchGetLoggedInUser),
    fork(watchGetFriends),
    fork(watchCreateFriendRequest),
    fork(watchGetFriendRequests),
    fork(watchGetChatList),
    fork(watchGetChat),
    fork(watchCreateChat),
    fork(watchGetUsers),
  ])
}

export function* socketSaga(socket: SocketIOClient.Socket) {
  yield all([
    fork(watchIncomingChatEvents, socket),
    fork(watchEmitMessageEvents, socket),
    fork(watchIncomingMessageEvents, socket),
    fork(watchEmitDraftMessageEvents, socket),
  ])
}
