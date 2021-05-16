import { call, put, take } from 'redux-saga/effects'
import {GET_LOGGED_IN_USER, LOGIN, LoginAction, REGISTER, RegisterAction, AuthUser} from './types';
import { AuthRepository } from '../../repositories/auth.repository';
import { ApiError, ApiResponse } from '../../repositories/api.service';
import {
  getLoggedInUserError,
  getLoggedInUserSuccess,
  loginError,
  loginSuccess,
  registerError,
  registerSuccess
} from './actions';

export function* watchLogin() {
  while(true) {
    const action: LoginAction = yield take(LOGIN);

    const { response, error }: ApiResponse<AuthUser> = yield call(AuthRepository.login, action.user);

    if (response)
      yield put(loginSuccess(response));
    else
      yield put(loginError(error as ApiError));
  }
}

export function* watchRegister() {
  while(true) {
    const action: RegisterAction = yield take(REGISTER);

    const { response, error }: ApiResponse<AuthUser> = yield call(AuthRepository.register, action.user);

    if (response)
      yield put(registerSuccess(response));
    else
      yield put(registerError(error as ApiError));
  }
}

export function* watchGetLoggedInUser() {
  while(true) {
    yield take(GET_LOGGED_IN_USER);

    const { response, error }: ApiResponse<AuthUser> = yield call(AuthRepository.me);

    if (response)
      yield put(getLoggedInUserSuccess(response));
    else
      yield put(getLoggedInUserError(error as ApiError));

  }
}
