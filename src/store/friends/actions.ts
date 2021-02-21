import {
  CREATE_FRIEND_REQUEST,
  CREATE_FRIEND_REQUEST_ERROR,
  CREATE_FRIEND_REQUEST_SUCCESS,
  CreateFriendRequestAction,
  CreateFriendRequestErrorAction,
  CreateFriendRequestSuccessAction,
  Friend,
  FriendRequest,
  GET_FRIEND_REQUESTS,
  GET_FRIEND_REQUESTS_ERROR,
  GET_FRIEND_REQUESTS_SUCCESS,
  GET_FRIENDS,
  GET_FRIENDS_ERROR,
  GET_FRIENDS_SUCCESS,
  GetFriendRequestsAction,
  GetFriendRequestsErrorAction,
  GetFriendRequestsSuccessAction,
  GetFriendsAction,
  GetFriendsErrorAction,
  GetFriendsSuccessAction
} from './types';
import {ApiError} from '../../repositories/api.service';

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

export function createFriendRequest(username: string): CreateFriendRequestAction {
  return {
    type: CREATE_FRIEND_REQUEST,
    username,
  }
}

export function createFriendRequestSuccess(): CreateFriendRequestSuccessAction {
  return {
    type: CREATE_FRIEND_REQUEST_SUCCESS,
  }
}

export function createFriendRequestError(error: ApiError): CreateFriendRequestErrorAction {
  return {
    type: CREATE_FRIEND_REQUEST_ERROR,
    error,
  }
}

export function getFriendRequests(): GetFriendRequestsAction {
  return {
    type: GET_FRIEND_REQUESTS,
  }
}

export function getFriendRequestsSuccess(friendRequests: FriendRequest[]): GetFriendRequestsSuccessAction {
  return {
    type: GET_FRIEND_REQUESTS_SUCCESS,
    friendRequests,
  }
}

export function getFriendRequestsError(error: ApiError): GetFriendRequestsErrorAction {
  return {
    type: GET_FRIEND_REQUESTS_ERROR,
    error,
  }
}