import {call, put, take} from 'redux-saga/effects'
import {CREATE_FRIEND_REQUEST, Friend, GET_FRIEND_REQUESTS, GET_FRIENDS} from './types';
import {ApiError, ApiResponse} from '../../repositories/api.service';
import {
  createFriendRequestError,
  createFriendRequestSuccess,
  getFriendRequestsError,
  getFriendRequestsSuccess,
  getFriendsError,
  getFriendsSuccess
} from './actions';
import {FriendsRepository, GetFriendRequestResponseType} from '../../repositories/friends.repository';

export function* watchGetFriends() {
  while(true) {
    yield take(GET_FRIENDS);

    const { response, error }: ApiResponse<Friend[]> = yield call(FriendsRepository.getFriends);

    if (response)
      yield put(getFriendsSuccess(response));
    else
      yield put(getFriendsError(error as ApiError));
  }
}

export function* watchCreateFriendRequest() {
  while(true) {
    const { username }: { username: string } = yield take(CREATE_FRIEND_REQUEST);

    const { response, error }: ApiResponse<null> = yield call(FriendsRepository.createFriendRequest, { username });

    if (response)
      yield put(createFriendRequestSuccess());
    else
      yield put(createFriendRequestError(error as ApiError));
  }
}

export function* watchGetFriendRequests() {
  while(true) {
    yield take(GET_FRIEND_REQUESTS);

    const { response, error }: ApiResponse<GetFriendRequestResponseType[]> = yield call(FriendsRepository.getFriendRequests);

    if (response)
      yield put(getFriendRequestsSuccess(response.map((friendRequest: GetFriendRequestResponseType) => ({
        id: friendRequest.id,
        user: friendRequest.requester,
      }))));
    else
      yield put(getFriendRequestsError(error as ApiError));
  }
}


