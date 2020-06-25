import { RootState } from './reducers';

export const getAuthState = (state: RootState) => state.auth;
export const getFriendsState = (state: RootState) => state.friends;
