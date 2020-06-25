import { FriendsActionTypes, FriendsState, GET_FRIENDS, GET_FRIENDS_ERROR, GET_FRIENDS_SUCCESS } from './types';

const initialState: FriendsState = {
  friends: [],
  pending: false,
  error: {
    message: '',
    errors: {},
  }
};

export function friendsReducer(state: FriendsState = initialState, action: FriendsActionTypes): FriendsState {
  switch (action.type) {
    case GET_FRIENDS:
      return {
        ...initialState,
        pending: true,
      };
    case GET_FRIENDS_SUCCESS:
      return {
        ...initialState,
        friends: action.friends,
      };
    case GET_FRIENDS_ERROR:
      return {
        ...initialState,
        error: action.error,
      };
    default: {
      return state;
    }
  }
}
