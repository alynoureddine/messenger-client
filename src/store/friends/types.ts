import {ApiError} from '../../repositories/api.service';
import {User} from "../users/types";

export const GET_FRIENDS = 'GET_FRIENDS';
export const GET_FRIENDS_SUCCESS = 'GET_FRIENDS_SUCCESS';
export const GET_FRIENDS_ERROR = 'GET_FRIENDS_ERROR';
export const CREATE_FRIEND_REQUEST = 'CREATE_FRIEND_REQUEST';
export const CREATE_FRIEND_REQUEST_SUCCESS = 'CREATE_FRIEND_REQUEST_SUCCESS';
export const CREATE_FRIEND_REQUEST_ERROR = 'CREATE_FRIEND_REQUEST_ERROR';
export const GET_FRIEND_REQUESTS = 'GET_FRIEND_REQUESTS';
export const GET_FRIEND_REQUESTS_SUCCESS = 'GET_FRIEND_REQUESTS_SUCCESS';
export const GET_FRIEND_REQUESTS_ERROR = 'GET_FRIEND_REQUESTS_ERROR';


export interface Friend {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  bio: string;
  image: string;
}

export interface FriendsState {
  friends: Friend[];
  pending: boolean;
  createdFriendRequest: any; //todo remove any
  friendRequestsState: FriendRequestsState;
  error: ApiError | null;
}

export interface FriendRequestsState {
  friendRequests: FriendRequest[];
  pending: boolean;
  error: ApiError | null;
}

export interface FriendRequest {
  id: number;
  user: User;
}

export interface GetFriendsAction {
  type: typeof GET_FRIENDS,
}

export interface GetFriendsSuccessAction {
  type: typeof GET_FRIENDS_SUCCESS,
  friends: Friend[],
}

export interface GetFriendsErrorAction {
  type: typeof GET_FRIENDS_ERROR,
  error: ApiError,
}

export interface CreateFriendRequestAction {
  type: typeof CREATE_FRIEND_REQUEST,
  username: string,
}

export interface CreateFriendRequestSuccessAction {
  type: typeof CREATE_FRIEND_REQUEST_SUCCESS,
}

export interface CreateFriendRequestErrorAction {
  type: typeof CREATE_FRIEND_REQUEST_ERROR,
  error: ApiError,
}

export interface GetFriendRequestsAction {
  type: typeof GET_FRIEND_REQUESTS,
}

export interface GetFriendRequestsSuccessAction {
  type: typeof GET_FRIEND_REQUESTS_SUCCESS,
  friendRequests: FriendRequest[],
}

export interface GetFriendRequestsErrorAction {
  type: typeof GET_FRIEND_REQUESTS_ERROR,
  error: ApiError,
}

export type FriendsActionTypes =
  GetFriendsAction
  | GetFriendsSuccessAction
  | GetFriendsErrorAction
  | CreateFriendRequestAction
  | CreateFriendRequestSuccessAction
  | CreateFriendRequestErrorAction
  | GetFriendRequestsAction
  | GetFriendRequestsSuccessAction
  | GetFriendRequestsErrorAction
