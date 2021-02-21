import {
  GET_USERS,
  GET_USERS_ERROR,
  GET_USERS_SUCCESS,
  GetUsersAction,
  GetUsersErrorAction,
  GetUsersSuccessAction,
  User
} from './types';
import {ApiError} from '../../repositories/api.service';

export function getUsers(username: string): GetUsersAction {
  return {
    type: GET_USERS,
    username,
  }
}

export function getUsersSuccess(users: User[]): GetUsersSuccessAction {
  return {
    type: GET_USERS_SUCCESS,
    users: users,
  }
}

export function getUsersError(error: ApiError): GetUsersErrorAction {
  return {
    type: GET_USERS_ERROR,
    error,
  }
}
