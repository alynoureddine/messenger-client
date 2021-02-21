import {
  CREATE_FRIEND_REQUEST,
  CREATE_FRIEND_REQUEST_ERROR,
  CREATE_FRIEND_REQUEST_SUCCESS,
  FriendsActionTypes,
  FriendsState,
  GET_FRIEND_REQUESTS,
  GET_FRIEND_REQUESTS_ERROR,
  GET_FRIEND_REQUESTS_SUCCESS,
  GET_FRIENDS,
  GET_FRIENDS_ERROR,
  GET_FRIENDS_SUCCESS
} from './types';
import {ApiError} from "../../repositories/api.service";

const errorInitialState: ApiError = {
  message: {},
  error: '',
}

const initialState: FriendsState = {
  friends: [],
  pending: false,
  createdFriendRequest: {
    pending: false,
    error: errorInitialState,
    requester: null as any, //todo remove any
    receiver: null as any,
  },
  friendRequestsState: {
    friendRequests: [],
    pending: false,
    error: errorInitialState,
  },
  error: errorInitialState
};

export function friendsReducer(state: FriendsState = initialState, action: FriendsActionTypes): FriendsState {
  switch (action.type) {
    case GET_FRIENDS:
      return {
        ...state,
        pending: true,
      };
    case GET_FRIENDS_SUCCESS:
      return {
        ...state,
        friends: action.friends,
        pending: false,
      };
    case GET_FRIENDS_ERROR:
      return {
        ...state,
        error: action.error,
      };
    case CREATE_FRIEND_REQUEST:
      return {
        ...state,
        createdFriendRequest: {
          ...state.createdFriendRequest,
          pending: true,
          error: null,
        }
      }
    case CREATE_FRIEND_REQUEST_SUCCESS:
      return {
        ...state,
        createdFriendRequest: {
          ...state.createdFriendRequest,
          pending: false,
          error: null,
        }
      }
    case CREATE_FRIEND_REQUEST_ERROR:
      return {
        ...state,
        createdFriendRequest: {
          ...state.createdFriendRequest,
          pending: false,
          error: action.error,
        }
      }
    case GET_FRIEND_REQUESTS:
      return {
        ...state,
        friendRequestsState: {
          ...state.friendRequestsState,
          pending: true,
        }
      };
    case GET_FRIEND_REQUESTS_SUCCESS:
      return {
        ...state,
        friendRequestsState: {
          friendRequests: action.friendRequests,
          pending: false,
          error: null,
        },
      };
    case GET_FRIEND_REQUESTS_ERROR:
      return {
        ...state,
        friendRequestsState: {
          ...state.friendRequestsState,
          error: action.error,
        }
      };

    default: {
      return state;
    }
  }
}
