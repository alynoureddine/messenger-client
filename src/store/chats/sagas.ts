import {
  Chat,
  CREATE_CHAT,
  CreateChatAction,
  DraftMessage,
  EMIT_DRAFT_MESSAGE,
  EMIT_MESSAGE,
  EmitDraftMessageAction,
  EmitMessageAction,
  GET_CHAT,
  GET_CHAT_LIST,
  GetChatAction,
  Message
} from './types';
import {ApiError, ApiResponse} from '../../repositories/api.service';
import {
  createChatError,
  createChatSuccess,
  emitDraftMessage,
  emitMessageSuccess,
  getChatError,
  getChatListError,
  getChatListSuccess,
  getChatSuccess, incomingChat,
  incomingMessage
} from './actions';
// import { ChatsRepository } from '../../repositories/list.repository';
import {call, put, take} from 'redux-saga/effects'
import {ChatsRepository} from '../../repositories/chats.repository';
// import { socket } from '../../components/App';
import {eventChannel} from 'redux-saga'
import {MessageResponse} from '../../common/message-response.interface';
import {store} from "../../index";


function createChatsSocketChannel(socket: SocketIOClient.Socket) {
  return eventChannel(emit => {

    const initHandler = (event: any) => {
      console.log(event);
      emit(event.chat)
    };

    // const errorHandler = (errorEvent) => {
    //   emit(new Error(errorEvent.reason))
    // };

    socket.on('chat', initHandler);
    // socket.on('error', errorHandler);

    const unsubscribe = () => {
      socket.off('chat', initHandler)
    };

    return unsubscribe
  })
}

export function* watchIncomingChatEvents(socket: SocketIOClient.Socket) {

  const socketChannel = yield call(createChatsSocketChannel, socket);

  while (true) {
    try {
      const chat: Chat = yield take(socketChannel);
      chat.pending = false;

      yield put(incomingChat(chat));

    } catch(err) {
      console.error('socket error:', err)
    }
  }
}

export function* watchGetChatList() {
  while(true) {
    yield take(GET_CHAT_LIST);

    const { response, error }: ApiResponse<Chat[]> = yield call(ChatsRepository.getChatList);

    if (response)
      yield put(getChatListSuccess(response.map((chat: Chat) => ({ ...chat, messages: [] }))));
    else
      yield put(getChatListError(error as ApiError));
  }
}

export function* watchGetChat() {
  while(true) {
    const action: GetChatAction = yield take(GET_CHAT);

    const { response, error }: ApiResponse<Chat> = yield call(ChatsRepository.getChat, action.id);

    if (response)
      yield put(getChatSuccess({ ...response }));
    else
      yield put(getChatError(error as ApiError));
  }
}

export function* watchCreateChat() {
  while(true) {
    const action: CreateChatAction = yield take(CREATE_CHAT);

    const { response, error }: ApiResponse<Chat> = yield call(ChatsRepository.createChat, action.friendId, action.draftChat.messages[0].text);

    if (response) {
      yield put(createChatSuccess(response, action.draftChat.draftId));

      const draftMessages: DraftMessage[] = store.getState().chats.list
        .find((chat: Chat) => chat.id === response.id)?.messages.filter((message: Message) => (message as DraftMessage).isDraft) as DraftMessage[];

      draftMessages?.forEach((draftMessage: DraftMessage): void => {
        store.dispatch(emitDraftMessage(draftMessage, response.id));
      });
    }
    else
      yield put(createChatError(error as ApiError));
  }
}

function createEmitMessageSocketChannel(socket: SocketIOClient.Socket, {text, chatId}: any) {
  return eventChannel(emit => {

    socket.emit('message', { text, chatId }, (response: any) => {
      emit(response);
    });

    return Function;
  })
}

export function* watchEmitMessageEvents(socket: SocketIOClient.Socket) {
  while (true) {
    try {
      const action: EmitMessageAction = yield take(EMIT_MESSAGE);
      console.timeLog('submit');
      const pendingMessage: Message = action.message;

      const socketChannel = yield call(createEmitMessageSocketChannel, socket, {text: pendingMessage.text, chatId: action.chatId});
      console.timeLog('submit');

      const message: MessageResponse = yield take(socketChannel);

      console.log(message);

      console.timeEnd('submit');

      yield put(emitMessageSuccess({
        // ...pendingMessage,
        ...message,
        pending: false,
      }, action.chatId, pendingMessage.id));

    } catch(err) {
      console.error('socket error:', err)
    }
  }
}

function createMessagesSocketChannel(socket: SocketIOClient.Socket) {
  return eventChannel(emit => {

    const messageHandler = (message: MessageResponse) => {
      emit(message);
    };

    socket.on('message', messageHandler);

    const unsubscribe = () => {
      socket.off('message', messageHandler)
    };

    return unsubscribe
  })
}

export function* watchIncomingMessageEvents(socket: SocketIOClient.Socket) {

  const socketChannel = yield call(createMessagesSocketChannel, socket);

  while (true) {
    try {
      const message: MessageResponse = yield take(socketChannel);
      console.log(message);
      yield put(incomingMessage(message));
    } catch(err) {
      console.error('socket error:', err)
    }
  }
}

export function* watchEmitDraftMessageEvents(socket: SocketIOClient.Socket) {
  while (true) {
    try {
      const action: EmitDraftMessageAction = yield take(EMIT_DRAFT_MESSAGE);
      const draftMessage: DraftMessage = action.draftMessage;

      const socketChannel = yield call(createEmitMessageSocketChannel, socket, {text: draftMessage.text, chatId: action.chatId});
      const message: MessageResponse = yield take(socketChannel);

      yield put(emitMessageSuccess({
        ...message,
        pending: false,
      }, action.chatId, draftMessage.id));

    } catch(err) {
      console.error('socket error:', err)
    }
  }
}
