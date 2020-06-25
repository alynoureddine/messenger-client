import { call, put, take } from 'redux-saga/effects'
import { Friend, GET_FRIENDS } from './types';
import { ApiError, ApiResponse } from '../../repositories/api.service';
import { getFriendsError, getFriendsSuccess } from './actions';
import { FriendsRepository } from '../../repositories/friends.repository';

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

