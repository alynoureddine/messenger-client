import { AuthActionTypes, AuthState, REGISTER, REGISTER_ERROR, REGISTER_SUCCESS } from './types';

const initialState: AuthState = {
  loggedIn: false,
  user: {
    email: '',
    username: '',
    firstName: '',
    lastName: '',
  },
  error: {
    message: '',
    errors: {}
  },
  pending: false,
};

export function authReducer(state: AuthState = initialState, action: AuthActionTypes): AuthState {
  switch (action.type) {
    case REGISTER:
      return {
        ...initialState,
        pending: true,
      };
    case REGISTER_SUCCESS:
      return {
        ...initialState,
        user: action.user,
        loggedIn: true,
      };
    case REGISTER_ERROR:
      return {
        ...initialState,
        error: action.error,
      };
    default: {
      return state;
    }
  }
}
