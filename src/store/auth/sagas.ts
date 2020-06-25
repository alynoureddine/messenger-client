import { call, put, take } from 'redux-saga/effects'
import { LOGIN, LoginAction, REGISTER, RegisterAction, User } from './types';
import { AuthRepository } from '../../repositories/auth.repository';
import { ApiError, ApiResponse } from '../../repositories/api.service';
import { loginError, loginSuccess, registerError, registerSuccess } from './actions';

export function* watchLogin() {
  while(true) {
    const action: LoginAction = yield take(LOGIN);

    const { response, error }: ApiResponse<User> = yield call(AuthRepository.login, action.user);

    if (response)
      yield put(loginSuccess(response));
    else
      yield put(loginError(error as ApiError));
  }
}

export function* watchRegister() {
  while(true) {
    const action: RegisterAction = yield take(REGISTER);

    const { response, error }: ApiResponse<User> = yield call(AuthRepository.register, action.user);

    if (response)
      yield put(registerSuccess(response));
    else
      yield put(registerError(error as ApiError));
  }
}
