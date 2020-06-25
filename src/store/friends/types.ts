import { ApiError } from '../../repositories/api.service';

export const GET_FRIENDS = 'GET_FRIENDS';
export const GET_FRIENDS_SUCCESS = 'GET_FRIENDS_SUCCESS';
export const GET_FRIENDS_ERROR = 'GET_FRIENDS_ERROR';

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
  error: ApiError;
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

export type FriendsActionTypes =
  GetFriendsAction
  | GetFriendsSuccessAction
  | GetFriendsErrorAction
