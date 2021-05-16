import {
  GET_LOGGED_IN_USER,
  GET_LOGGED_IN_USER_ERROR,
  GET_LOGGED_IN_USER_SUCCESS,
  GetLoggedInUserAction,
  GetLoggedInUserErrorAction,
  GetLoggedInUserSuccessAction,
  LOGIN,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LoginAction,
  LoginErrorAction,
  LoginSuccessAction,
  LoginUserPayload,
  REGISTER,
  REGISTER_ERROR,
  REGISTER_SUCCESS,
  RegisterAction,
  RegisterErrorAction,
  RegisterSuccessAction,
  RegisterUserPayload,
  AuthUser
} from './types';
import {ApiError} from '../../repositories/api.service';

export function login(user: LoginUserPayload): LoginAction {
  return {
    type: LOGIN,
    user: user,
  }
}

export function loginSuccess(user: AuthUser): LoginSuccessAction {
  return {
    type: LOGIN_SUCCESS,
    user: user,
  }
}

export function loginError(error: ApiError): LoginErrorAction {
  return {
    type: LOGIN_ERROR,
    error,
  }
}

export function register(user: RegisterUserPayload): RegisterAction {
  return {
    type: REGISTER,
    user: user,
  }
}

export function registerSuccess(user: AuthUser): RegisterSuccessAction {
  return {
    type: REGISTER_SUCCESS,
    user: user,
  }
}

export function registerError(error: ApiError): RegisterErrorAction {
  return {
    type: REGISTER_ERROR,
    error,
  }
}

export function getLoggedInUser(): GetLoggedInUserAction {
  return {
    type: GET_LOGGED_IN_USER,
  }
}

export function getLoggedInUserSuccess(user: AuthUser): GetLoggedInUserSuccessAction {
  return {
    type: GET_LOGGED_IN_USER_SUCCESS,
    user,
  }
}

export function getLoggedInUserError(error: ApiError): GetLoggedInUserErrorAction {
  return {
    type: GET_LOGGED_IN_USER_ERROR,
    error,
  }
}
