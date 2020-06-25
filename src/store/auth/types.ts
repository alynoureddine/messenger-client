import { ApiError } from '../../repositories/api.service';

export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const REGISTER = 'REGISTER';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_ERROR = 'REGISTER_ERROR';

export interface User {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface LoginUserPayload {
  username: string;
  password: string;
}

export interface RegisterUserPayload {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface AuthState {
  loggedIn: boolean;
  user: User;
  error: ApiError,
  pending: boolean,
}

export interface LoginAction {
  type: typeof LOGIN,
  user: LoginUserPayload,
}

export interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS,
  user: User,
}

export interface LoginErrorAction {
  type: typeof LOGIN_ERROR,
  error: ApiError,
}

export interface RegisterAction {
  type: typeof REGISTER,
  user: RegisterUserPayload,
}

export interface RegisterSuccessAction {
  type: typeof REGISTER_SUCCESS,
  user: User,
}

export interface RegisterErrorAction {
  type: typeof REGISTER_ERROR,
  error: ApiError,
}

export type AuthActionTypes =
  LoginAction
  | LoginSuccessAction
  | LoginErrorAction
  | RegisterAction
  | RegisterSuccessAction
  | RegisterErrorAction;
