import { auth, AUTH } from './actions';
import { authRequest, AuthResponse } from '../../api/auth';
import { call, put, takeEvery } from 'redux-saga/effects';

function* authSaga(action: ReturnType<typeof auth.request>) {
    try{
      const authResponse : AuthResponse = yield call(authRequest, action.payload);
      yield put(auth.success(authResponse));
      const { history, option, adminRoute } = action.payload;
      //console.log(authResponse.isAuth);
      if(!authResponse.isAuth) {
        if(option) {
          history.push('/login');
        }
      } else {
        // if (adminRoute && !authResponse.isAdmin) {
        //   history.push('/');
        // }
        // else {
        if(option === false ) {
          history.push('/');
        }
        // }
      }
    } catch(e) {
      yield put(auth.failure(e));
    }
  }

  export function* userDataSaga() {
    yield takeEvery(AUTH.REQUEST, authSaga)
}