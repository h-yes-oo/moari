import { auth, AUTH, likeClub, LIKE_CLUB } from './actions';
import { authRequest, AuthResponse, likeClubRequest, LikeClubResponse } from '../../api/auth';
import { call, put, takeEvery } from 'redux-saga/effects';

function* authSaga(action: ReturnType<typeof auth.request>) {
  try {
    const authResponse: AuthResponse = yield call(authRequest, action.payload);
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

function* likeClubSaga(action: ReturnType<typeof likeClub.request>) {
  try {
    const likeClubResponse : LikeClubResponse = yield call(likeClubRequest, action.payload);
    yield put(likeClub.success(likeClubResponse));
    const { setLikeImg, likeImg, setLikeCount, likeCount } = action.payload;
    if(likeClubResponse.success) {
        setLikeImg(!likeImg);
        if(likeImg){
          setLikeCount(likeCount-1);
        } else{
          setLikeCount(likeCount+1);
        }
    } else {
      alert('좋아요 누르기에 실패했습니다.')
    }
  } catch (e) {
    yield put(likeClub.failure(e));
  }
}

export function* likeSaga() {
  yield takeEvery(LIKE_CLUB.REQUEST, likeClubSaga)
}