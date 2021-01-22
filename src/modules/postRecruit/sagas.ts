import { postRecruit, POST_RECRUIT } from './actions';
import { postRecruitRequest, PostRecruitResponse } from '../../api/recruit';
import { call, put, takeEvery } from 'redux-saga/effects';

function* postRecruitSaga(action: ReturnType<typeof postRecruit.request>) {
  try {
    const postRecruitResponse : PostRecruitResponse = yield call(postRecruitRequest, action.payload);
    const { history } = action.payload;
    yield put(postRecruit.success(postRecruitResponse));
    if(postRecruitResponse.success) {
        alert('모집 공고 등록에 성공하였습니다');
        history.push('/');
    } else {
        alert('모집 공고 등록 중 서버에서 에러가 발생했습니다');
    }
  } catch (e) {
    yield put(postRecruit.failure(e));
  }
}

export function* recruitSaga() {
  yield takeEvery(POST_RECRUIT.REQUEST, postRecruitSaga)
}