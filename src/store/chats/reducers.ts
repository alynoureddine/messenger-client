import {
  Chat,
  ChatsActionTypes,
  ChatsState,
  CREATE_CHAT,
  CREATE_CHAT_ERROR,
  CREATE_CHAT_SUCCESS,
  CREATE_DRAFT_MESSAGE,
  DraftChat,
  DraftMessage,
  EMIT_DRAFT_MESSAGE,
  EMIT_MESSAGE,
  EMIT_MESSAGE_SUCCESS,
  GET_CHAT,
  GET_CHAT_ERROR,
  GET_CHAT_LIST,
  GET_CHAT_LIST_ERROR,
  GET_CHAT_LIST_SUCCESS,
  GET_CHAT_SUCCESS,
  INCOMING_CHAT,
  INCOMING_MESSAGE,
  Message
} from './types';

const initialState: ChatsState = {
  list: [],
  pending: false,
  error: {
    message: {},
    error: '',
  },
};

export function chatsReducer(state: ChatsState = initialState, action: ChatsActionTypes): ChatsState {
  switch (action.type) {
    case GET_CHAT_LIST:
      return {
        ...initialState,
        pending: true,
      };
    case GET_CHAT_LIST_SUCCESS:
      return {
        ...initialState,
        list: action.list,
      };
    case GET_CHAT_LIST_ERROR:
      return {
        ...initialState,
        error: action.error,
      };
    case GET_CHAT:
      return {
        ...state,
        list: state.list.map((chat: Chat) => action.id === chat.id ? {...chat, pending: true} : chat)
      };
    case GET_CHAT_SUCCESS:
      return {
        ...state,
        list: state.list.map((chat: Chat) => {
          return chat.id === action.chat.id ? {...action.chat, pending: false} : chat;
        }),
      };
    case GET_CHAT_ERROR:
      return {
        ...state,
        error: action.error,
      };
    case EMIT_MESSAGE:
      {
        console.timeLog('submit');

        const obj = {
          ...state,
          list: state.list.map(((chat: Chat) => action.chatId === chat.id ? {
            ...chat,
            messages: (chat.messages).concat(action.message)
          } : chat))
        };

        console.timeLog('submit');

        return obj;
      }
    case EMIT_MESSAGE_SUCCESS:
      return {
        ...state,
        list: state.list.map(((chat: Chat) => action.chatId === chat.id ? {
          ...chat,
          messages: chat.messages.map((message: Message) => message.id === action.pendingMessageId ? action.message : message)
        } : chat))
      };
    case INCOMING_MESSAGE:
      return {
        ...state,
        list: state.list.map(((chat: Chat) => action.message.chat.id === chat.id ? {
          ...chat,
          messages: (chat.messages).concat({...action.message, pending: false}),
        } : chat)),
      };
    case CREATE_CHAT:
      return {
        ...state,
        list: [ action.draftChat, ...state.list]
      };
    case CREATE_CHAT_SUCCESS:
      return {
        ...state,
        list: state.list.map((chat: Chat) => ({
          ...chat,
          id: chat.id === action.draftId ? action.chat.id : chat.id,
          pending: false,
        }))
      };
    case CREATE_CHAT_ERROR:
      return {
        ...state,
        error: action.error,
      };
    case CREATE_DRAFT_MESSAGE:
      return {
        ...state,
        list: state.list.map(((chat: Chat) => action.draftChatId === (chat as DraftChat).draftId ? {
          ...chat,
          messages: chat.messages.concat(action.message)
        } : chat))
      };
    case EMIT_DRAFT_MESSAGE:
      return {
        ...state,
        list: state.list.map(((chat: Chat) => action.chatId === chat.id ? {
          ...chat,
          messages: chat.messages.map((message: Message): Message | DraftMessage =>
            (message as DraftMessage).isDraft ? { ...message, isDraft: false } : message
          )
        } : chat))
      };
    case INCOMING_CHAT:
      return {
        ...state,
        list: state.list.concat(action.chat)
      }
    default: {
      return state;
    }
  }
}
