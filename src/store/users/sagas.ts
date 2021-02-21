import {call, put, take} from 'redux-saga/effects'
import {GET_USERS, GetUsersAction, User} from './types';
import {ApiError, ApiResponse} from '../../repositories/api.service';
import {getUsersError, getUsersSuccess} from './actions';
import {UsersRepository} from '../../repositories/users.repository';

export function* watchGetUsers() {
  while(true) {
    const user: GetUsersAction = yield take(GET_USERS);

    const { response, error }: ApiResponse<User[]> = yield call(UsersRepository.getUsers, user.username);

    if (response)
      yield put(getUsersSuccess(response));
    else
      yield put(getUsersError(error as ApiError));
  }
}

