import {
  AuthActionTypes,
  AuthState,
  GET_LOGGED_IN_USER,
  GET_LOGGED_IN_USER_ERROR,
  GET_LOGGED_IN_USER_SUCCESS,
  LOGIN,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  REGISTER,
  REGISTER_ERROR,
  REGISTER_SUCCESS
} from './types';

const initialState: AuthState = {
  loggedIn: false,
  user: {
    email: '',
    username: '',
    firstName: '',
    lastName: '',
  },
  error: {
    message: {},
    error: ''
  },
  pending: false,
};

export function authReducer(state: AuthState = initialState, action: AuthActionTypes): AuthState {
  switch (action.type) {
    case REGISTER:
      return {
        ...state,
        pending: true,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        user: action.user,
        loggedIn: true,
      };
    case REGISTER_ERROR:
      return {
        ...state,
        error: {
          ...action.error,
        },
      };
    case LOGIN:
      return {
        ...state,
        pending: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.user,
        loggedIn: true,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        error: {
          ...action.error,
        },
      };
    case GET_LOGGED_IN_USER:
      return {
        ...state,
        pending: true,
      };
    case GET_LOGGED_IN_USER_SUCCESS:
      return {
        ...state,
        user: action.user,
        loggedIn: true,
      };
    case GET_LOGGED_IN_USER_ERROR:
      return {
        ...initialState,
      };
    default: {
      return state;
    }
  }
}
