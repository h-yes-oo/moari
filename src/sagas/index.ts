import { takeEvery, call, put } from 'redux-saga/effects'

import { LOGIN_USER, loginUserRequest, loginUser } from 'actions/login';
import { SIGNUP_USER, signupUser, signupUserRequest } from 'actions/signup'
import { AUTH, auth, authRequest } from 'actions/auth';
import { fetchClubsAllRequest, fetchClub, fetchClubSingleRequest, postClub, postClubRequest, searchClub, searchClubRequest } from 'actions/club'
import { AxiosResponse } from 'axios'
import { AuthResponse, Club, LoginResponse, SignupResponse, User } from 'store/types'
import { clubLike, clubLikeRequest, CLUB_LIKE, getUser, getUserRequest, GET_USER } from 'actions/user';

function* fetchClubsAllSaga(): Generator {
  try {
    const clubs = yield call(fetchClubsAllRequest)
    yield put({ type: 'CLUBS_ALL_FETCH_SUCCESS', payload: { clubs: clubs } })
  } catch (e) {
    yield put({ type: 'CLUBS_ALL_FETCH_FAILURE', payload: { message: e.message } })
  }
}

function* fetchClubSaga(action: ReturnType<typeof fetchClub.request>): Generator {
  try {
    const club = yield call(fetchClubSingleRequest, action.payload);
    yield put({ type: 'CLUB_SINGLE_FETCH_SUCCESS', payload: club })
  } catch (e) {
    yield put({ type: 'CLUB_SINGLE_FETCH_FAILURE', payload: { message: e.message } })
  }
}

function* postClubSaga(action: ReturnType<typeof postClub.request>): Generator {
  try {
    const club = yield call(postClubRequest, action.payload);
    // yield put(postClub.success(club));
    yield put({ type: 'CLUB_POST_SUCCESS', payload: { club: club } })
  } catch (e) {
    yield put({ type: 'CLUB_POST_FAILURE', payload: { message: e.message } })
    // yield put(postClub.failure(e))
  }
}

function* searchClubSaga(action: ReturnType<typeof searchClub.request>): Generator {
  try {
    const clubs = yield call(searchClubRequest, action.payload);
    yield put({ type: 'CLUB_SEARCH_SUCCESS', payload: clubs });
  } catch (e) {
    yield put({ type: 'CLUB_SEARCH_FAILURE', payload: { message: e.message } });
  }
}

function* signupUserSaga(action: ReturnType<typeof signupUser.request>) {
  try{
    const signupResponse : SignupResponse = yield call(signupUserRequest, action.payload);
    yield put(signupUser.success(signupResponse));
    const { history } = action.payload;
    if(signupResponse.success === true){
      history.push('/login');
    } else {
      alert('회원가입에 실패했습니다. 다시 시도해주세요');
    }
  } catch (e) {
    yield put(signupUser.failure(e));
  }
}

function* loginUserSaga(action: ReturnType<typeof loginUser.request>) {
  try{
    const loginResponse : LoginResponse = yield call(loginUserRequest, action.payload);
    const { history } = action.payload;
    yield put(loginUser.success(loginResponse));
    if(loginResponse.loginSuccess === true){
      history.push('/');
    } else {
      alert(loginResponse.message);
    }
  } catch(e) {
    yield put(loginUser.failure(e));
  }
}

function* addManagerToClubSaga(): Generator {
  try {

  } catch (e) {

  }
}

function* removeManagerFromClubSaga(): Generator {
  try {

  } catch (e) {

  }
}

function* authSaga(action: ReturnType<typeof auth.request>) {
  try{
    const authResponse : AuthResponse = yield call(authRequest, action.payload);
    yield put(auth.success(authResponse));
    const { history, option, adminRoute } = action.payload;
    console.log(authResponse.isAuth);
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

function* getUserSaga(action: ReturnType<typeof getUser.request>) {
  try {
    const user: User = yield call(getUserRequest, action.payload);
    yield put(getUser.success(user));
  } catch(e) {
    yield put(getUser.failure(e));
  }
}

function* clubLikeSaga(action: ReturnType<typeof clubLike.request>) {
  try {
    const user: User = yield call(clubLikeRequest, action.payload);
    yield put(clubLike.success(user));
  } catch(e) {
    yield put(clubLike.failure(e));
  }
}

export default function* sagas() {
  // takeEvery로 CLUB_FETCH_REQUEST를 지속적으로 감시
  yield takeEvery("CLUBS_ALL_FETCH_REQUEST", fetchClubsAllSaga)
  yield takeEvery("CLUB_SINGLE_FETCH_REQUEST", fetchClubSaga)
  yield takeEvery("CLUB_POST_REQUEST", postClubSaga)
  yield takeEvery("CLUB_SEARCH_REQUEST", searchClubSaga)
  yield takeEvery(SIGNUP_USER.REQUEST, signupUserSaga)
  yield takeEvery(LOGIN_USER.REQUEST, loginUserSaga)
  yield takeEvery(AUTH.REQUEST, authSaga)
  yield takeEvery(GET_USER.REQUEST, getUserSaga)
  yield takeEvery(CLUB_LIKE.REQUEST, clubLikeSaga)
  // yield takeEvery("ADD_MANAGER", addManagerToClubSaga)
  // yield takeEvery("REMOVE_MANAGER", removeManagerFromClubSaga)
}
