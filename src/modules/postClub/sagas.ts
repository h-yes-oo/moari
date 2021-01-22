import { postClub, POST_CLUB } from './actions';
import { postClubRequest, PostClubResponse } from '../../api/postClub';
import { call, put, takeEvery } from 'redux-saga/effects';

function* postClubSaga(action: ReturnType<typeof postClub.request>) {
  try {
    const postClubResponse : PostClubResponse = yield call(postClubRequest, action.payload);
    const { history } = action.payload;
    yield put(postClub.success(postClubResponse));
    if(postClubResponse.success) {
        alert('동아리 정보 등록에 성공하였습니다');
        history.push('/');
    } else {
        alert('동아리 정보 등록 중 서버에서 에러가 발생했습니다');
    }
  } catch (e) {
    yield put(postClub.failure(e));
  }
}

export function* postSaga() {
    yield takeEvery(POST_CLUB.REQUEST, postClubSaga)
}