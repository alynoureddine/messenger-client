import {ApiError} from '../../repositories/api.service';
import {Friend} from '../friends/types';
import {MessageResponse} from '../../common/message-response.interface';
import {User} from "../users/types";
import {AuthUser} from "../auth/types";

export const GET_CHAT_LIST = 'GET_CHAT_LIST';
export const GET_CHAT_LIST_SUCCESS = 'GET_CHAT_LIST_SUCCESS';
export const GET_CHAT_LIST_ERROR = 'GET_CHAT_LIST_ERROR';
export const GET_CHAT = 'GET_CHAT';
export const GET_CHAT_SUCCESS = 'GET_CHAT_SUCCESS';
export const GET_CHAT_ERROR = 'GET_CHAT_ERROR';
export const EMIT_MESSAGE = 'EMIT_MESSAGE';
export const EMIT_MESSAGE_SUCCESS = 'EMIT_MESSAGE_SUCCESS';
export const EMIT_MESSAGE_ERROR = 'EMIT_MESSAGE_ERROR';
export const INCOMING_MESSAGE = 'INCOMING_MESSAGE';
export const CREATE_CHAT = 'CREATE_CHAT';
export const CREATE_CHAT_SUCCESS = 'CREATE_CHAT_SUCCESS';
export const CREATE_CHAT_ERROR = 'CREATE_CHAT_ERROR';
export const CREATE_DRAFT_MESSAGE = 'CREATE_DRAFT_MESSAGE';
export const EMIT_DRAFT_MESSAGE = 'EMIT_DRAFT_MESSAGE';
export const INCOMING_CHAT = 'INCOMING_CHAT';

export interface Message {
  id: number;
  text: string;
  user: User;
  date: string;
  pending: boolean;
}

export interface DraftMessage extends Message {
  isDraft: boolean;
}

export interface Chat {
  id: number;
  users: (Friend | AuthUser) [];
  messages: Message[];
  pending?: boolean;
}

export interface DraftChat extends Chat {
  draftId: number;
}

export interface NewChat {
  friend: Friend
}

export interface ChatsState {
  list: Chat[];
  pending: boolean;
  error: ApiError;
}

export interface GetChatListAction {
  type: typeof GET_CHAT_LIST,
}

export interface GetChatListSuccessAction {
  type: typeof GET_CHAT_LIST_SUCCESS,
  list: Chat[],
}

export interface GetChatListErrorAction {
  type: typeof GET_CHAT_LIST_ERROR,
  error: ApiError,
}

export interface GetChatAction {
  type: typeof GET_CHAT,
  id: number,
}

export interface GetChatSuccessAction {
  type: typeof GET_CHAT_SUCCESS,
  chat: Chat,
}

export interface GetChatErrorAction {
  type: typeof GET_CHAT_ERROR,
  error: ApiError,
}

export interface EmitMessageAction {
  type: typeof EMIT_MESSAGE,
  message: Message,
  chatId: number,
}

export interface EmitMessageSuccessAction {
  type: typeof EMIT_MESSAGE_SUCCESS,
  message: Message,
  chatId: number,
  pendingMessageId: number,
}

export interface EmitMessageErrorAction {
  type: typeof EMIT_MESSAGE_ERROR,
  error: ApiError,
}

export interface IncomingMessageAction {
  type: typeof INCOMING_MESSAGE,
  message: MessageResponse,
}

export interface CreateChatAction {
  type: typeof CREATE_CHAT,
  draftChat: DraftChat,
  friendId: number,
}

export interface CreateChatSuccessAction {
  type: typeof CREATE_CHAT_SUCCESS,
  chat: Chat,
  draftId: number,
}

export interface CreateChatErrorAction {
  type: typeof CREATE_CHAT_ERROR,
  error: ApiError,
}

export interface CreateDraftMessageAction {
  type: typeof CREATE_DRAFT_MESSAGE,
  message: DraftMessage,
  draftChatId: number,
}

export interface EmitDraftMessageAction {
  type: typeof EMIT_DRAFT_MESSAGE,
  draftMessage: DraftMessage,
  chatId: number,
}

export interface IncomingChatAction {
  type: typeof INCOMING_CHAT,
  chat: Chat,
}

export type ChatsActionTypes =
  GetChatListAction
  | GetChatListSuccessAction
  | GetChatListErrorAction
  | GetChatAction
  | GetChatSuccessAction
  | GetChatErrorAction
  | EmitMessageAction
  | EmitMessageSuccessAction
  | EmitMessageErrorAction
  | IncomingMessageAction
  | CreateChatAction
  | CreateChatSuccessAction
  | CreateChatErrorAction
  | CreateDraftMessageAction
  | EmitDraftMessageAction
  | IncomingChatAction;
