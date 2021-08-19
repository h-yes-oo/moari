import { fetchStories, FETCH_STORIES } from './actions';
import { fetchStoriesRequest, StoriesResponse } from '../../api/story';
import { call, put, takeEvery } from 'redux-saga/effects';

function* fetchStoriesSaga(action: ReturnType<typeof fetchStories.request>) {
  try {
    const fetchAllResponse : StoriesResponse = yield call(fetchStoriesRequest, action.payload);
    yield put(fetchStories.success(fetchAllResponse));
    if(!fetchAllResponse.success) {
      alert('동아리 소식을 서버에서 가져오지 못했습니다');
    }
  } catch (e) {
    yield put(fetchStories.failure(e));
  }
}


export function* storiesSaga() {
  yield takeEvery(FETCH_STORIES.REQUEST, fetchStoriesSaga)
}