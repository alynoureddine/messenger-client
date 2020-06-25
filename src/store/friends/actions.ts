import {
  Friend,
  GET_FRIENDS,
  GET_FRIENDS_ERROR,
  GET_FRIENDS_SUCCESS,
  GetFriendsAction,
  GetFriendsErrorAction,
  GetFriendsSuccessAction
} from './types';
import { ApiError } from '../../repositories/api.service';

export function getFriends(): GetFriendsAction {
  return {
    type: GET_FRIENDS,
  }
}

export function getFriendsSuccess(friends: Friend[]): GetFriendsSuccessAction {
  return {
    type: GET_FRIENDS_SUCCESS,
    friends: friends,
  }
}

export function getFriendsError(error: ApiError): GetFriendsErrorAction {
  return {
    type: GET_FRIENDS_ERROR,
    error,
  }
}
