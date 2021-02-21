import {GET_USERS, GET_USERS_ERROR, GET_USERS_SUCCESS, UsersActionTypes, UsersState} from './types';

const initialState: UsersState = {
  users: [],
  pending: false,
  error: {
    message: {},
    error: '',
  }
};

export function usersReducer(state: UsersState = initialState, action: UsersActionTypes): UsersState {
  switch (action.type) {
    case GET_USERS:
      return {
        ...initialState,
        pending: true,
      };
    case GET_USERS_SUCCESS:
      return {
        ...initialState,
        users: action.users,
      };
    case GET_USERS_ERROR:
      return {
        ...initialState,
        error: action.error,
      };
    default: {
      return state;
    }
  }
}
