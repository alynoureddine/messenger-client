import { all, fork } from 'redux-saga/effects'
import { watchLogin, watchRegister } from './auth/sagas';
import { watchGetFriends } from './friends/sagas';

export default function* rootSaga() {
  yield all([
    fork(watchRegister),
    fork(watchLogin),
    fork(watchGetFriends),
  ])
}
