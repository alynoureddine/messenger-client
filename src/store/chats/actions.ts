import {
  Chat,
  CREATE_CHAT,
  CREATE_CHAT_ERROR,
  CREATE_CHAT_SUCCESS,
  CREATE_DRAFT_MESSAGE,
  CreateChatAction,
  CreateChatErrorAction,
  CreateChatSuccessAction,
  CreateDraftMessageAction,
  DraftChat,
  DraftMessage,
  EMIT_DRAFT_MESSAGE,
  EMIT_MESSAGE,
  EMIT_MESSAGE_ERROR,
  EMIT_MESSAGE_SUCCESS,
  EmitDraftMessageAction,
  EmitMessageAction,
  EmitMessageErrorAction,
  EmitMessageSuccessAction,
  GET_CHAT,
  GET_CHAT_ERROR,
  GET_CHAT_LIST,
  GET_CHAT_LIST_ERROR,
  GET_CHAT_LIST_SUCCESS,
  GET_CHAT_SUCCESS,
  GetChatAction,
  GetChatErrorAction,
  GetChatListAction,
  GetChatListErrorAction,
  GetChatListSuccessAction,
  GetChatSuccessAction, INCOMING_CHAT,
  INCOMING_MESSAGE, IncomingChatAction,
  Message
} from './types';
import {ApiError} from '../../repositories/api.service';
import {MessageResponse} from '../../common/message-response.interface';

export function getChatList(): GetChatListAction {
  return {
    type: GET_CHAT_LIST,
  }
}

export function getChatListSuccess(chatList: Chat[]): GetChatListSuccessAction {
  return {
    type: GET_CHAT_LIST_SUCCESS,
    list: chatList,
  }
}

export function getChatListError(error: ApiError): GetChatListErrorAction {
  return {
    type: GET_CHAT_LIST_ERROR,
    error,
  }
}

export function getChat(id: number): GetChatAction {
  return {
    type: GET_CHAT,
    id,
  }
}

export function getChatSuccess(chat: Chat): GetChatSuccessAction {
  return {
    type: GET_CHAT_SUCCESS,
    chat: chat,
  }
}

export function getChatError(error: ApiError): GetChatErrorAction {
  return {
    type: GET_CHAT_ERROR,
    error,
  }
}

export function emitMessage(message: Message, chatId: number): EmitMessageAction {
  return {
    type: EMIT_MESSAGE,
    message,
    chatId,
  }
}

export function emitMessageSuccess(message: Message, chatId: number, pendingMessageId: number): EmitMessageSuccessAction {
  return {
    type: EMIT_MESSAGE_SUCCESS,
    message,
    chatId,
    pendingMessageId,
  }
}

export function emitMessageError(error: ApiError): EmitMessageErrorAction {
  return {
    type: EMIT_MESSAGE_ERROR,
    error,
  }
}

export function incomingMessage(message: MessageResponse) {
  return {
    type: INCOMING_MESSAGE,
    message,
  }
}

export function createChat(draftChat: DraftChat, friendId: number): CreateChatAction {
  return {
    type: CREATE_CHAT,
    draftChat,
    friendId,
  }
}

export function createChatSuccess(chat: Chat, draftId: number): CreateChatSuccessAction {
  return {
    type: CREATE_CHAT_SUCCESS,
    chat,
    draftId,
  }
}

export function createChatError(error: ApiError): CreateChatErrorAction {
  return {
    type: CREATE_CHAT_ERROR,
    error,
  }
}

export function createDraftMessage(message: DraftMessage, draftChatId: number): CreateDraftMessageAction {
  return {
    type: CREATE_DRAFT_MESSAGE,
    message: message,
    draftChatId,
  }
}

export function emitDraftMessage(draftMessage: DraftMessage, chatId: number): EmitDraftMessageAction {
  return {
    type: EMIT_DRAFT_MESSAGE,
    draftMessage,
    chatId,
  }
}

export function incomingChat(chat: Chat): IncomingChatAction {
  return {
    type: INCOMING_CHAT,
    chat,
  }
}