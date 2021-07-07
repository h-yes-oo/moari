import { call, put, takeEvery } from 'redux-saga/effects';

import { signupUser, SIGNUP_USER } from './actions';
import { signupUserRequest, SignupResponse } from '../../api/signup';

function* signupUserSaga(action: ReturnType<typeof signupUser.request>) {
  try {
    const signupResponse: SignupResponse = yield call(signupUserRequest, action.payload);
    yield put(signupUser.success(signupResponse));
    const { history } = action.payload;
    if (signupResponse.success === true) {
      history.push('/login');
    } else {
      alert('회원가입에 실패했습니다. 다시 시도해주세요');
    }
  } catch (e) {
    yield put(signupUser.failure(e));
  }
}

export function* signupSaga() {
  yield takeEvery(SIGNUP_USER.REQUEST, signupUserSaga);
}
