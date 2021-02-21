import {ApiError} from '../../repositories/api.service';

export const GET_USERS = 'GET_USERS';
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
export const GET_USERS_ERROR = 'GET_USERS_ERROR';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  bio: string;
  image: string;
}

export interface UsersState {
  users: User[];
  pending: boolean;
  error: ApiError;
}

export interface GetUsersAction {
  type: typeof GET_USERS,
  username: string,
}

export interface GetUsersSuccessAction {
  type: typeof GET_USERS_SUCCESS,
  users: User[],
}

export interface GetUsersErrorAction {
  type: typeof GET_USERS_ERROR,
  error: ApiError,
}

export type UsersActionTypes =
  GetUsersAction
  | GetUsersSuccessAction
  | GetUsersErrorAction
