import {
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
  User
} from './types';
import { ApiError } from '../../repositories/api.service';

export function login(user: LoginUserPayload): LoginAction {
  return {
    type: LOGIN,
    user: user,
  }
}

export function loginSuccess(user: User): LoginSuccessAction {
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

export function registerSuccess(user: User): RegisterSuccessAction {
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
