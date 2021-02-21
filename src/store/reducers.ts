import {combineReducers} from 'redux';
import {authReducer} from './auth/reducers';
import {friendsReducer} from './friends/reducers';
import {chatsReducer} from './chats/reducers';
import {usersReducer} from "./users/reducers";

export const rootReducer = combineReducers({
  auth: authReducer,
  friends: friendsReducer,
  chats: chatsReducer,
  users: usersReducer,
});

export type RootState = ReturnType<typeof rootReducer>
