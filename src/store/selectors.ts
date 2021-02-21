import {RootState} from './reducers';

export const getAuthState = (state: RootState) => state.auth;
export const getFriendsState = (state: RootState) => state.friends;
export const getChatsState = (state: RootState) => state.chats;
export const getChatsListState = (state: RootState) => state.chats.list;
export const getUsersState = (state: RootState) => state.users;
