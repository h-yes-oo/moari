import { call, put, takeEvery } from 'redux-saga/effects';

import { logoutUser, LOGOUT_USER } from './actions';
import { logoutRequest, LogoutResponse } from '../../api/logout';

function* logoutUserSaga(action: ReturnType<typeof logoutUser.request>) {
  try {
    const logoutResponse: LogoutResponse = yield call(logoutRequest, action.payload);
    const { history } = action.payload;
    if (logoutResponse.success) {
      history.push('/login');
      localStorage.removeItem('userId');
    } else {
      alert('로그아웃에 실패했습니다');
    }
    yield put(logoutUser.success(logoutResponse));
  } catch (e) {
    yield put(logoutUser.failure(e));
  }
}

export function* logoutSaga() {
  yield takeEvery(LOGOUT_USER.REQUEST, logoutUserSaga);
}
