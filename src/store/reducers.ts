import { combineReducers } from 'redux';
import { authReducer } from './auth/reducers';
import { friendsReducer } from './friends/reducers';

export const rootReducer = combineReducers({
  auth: authReducer,
  friends: friendsReducer,
});

export type RootState = ReturnType<typeof rootReducer>
