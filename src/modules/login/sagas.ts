import { call, put, takeEvery } from 'redux-saga/effects';

import { loginUser, LOGIN_USER } from './actions';
import { loginUserRequest, LoginResponse } from '../../api/login';

function* loginUserSaga(action: ReturnType<typeof loginUser.request>) {
  try {
    const loginResponse: LoginResponse = yield call(loginUserRequest, action.payload);
    const { history, rememberMe } = action.payload;
    yield put(loginUser.success(loginResponse));
    if (loginResponse.loginSuccess === true) {
      window.localStorage.setItem('userId', loginResponse.userId);
      if (rememberMe === true) {
        window.localStorage.setItem('rememberMe', loginResponse.loginId);
      } else {
        localStorage.removeItem('rememberMe');
      }
      history.push('/');
    } else {
      alert(loginResponse.message);
    }
  } catch (e) {
    yield put(loginUser.failure(e));
  }
}

export function* loginSaga() {
  yield takeEvery(LOGIN_USER.REQUEST, loginUserSaga);
}
