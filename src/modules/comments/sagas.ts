import { call, put, takeEvery } from 'redux-saga/effects';

import { fetchComments, FETCH_COMMENTS, searchComments, SEARCH_COMMENTS } from './actions';
import { fetchCommentsRequest, searchCommentsRequest, CommentsResponse } from '../../api/comments';

function* fetchCommentsSaga(action: ReturnType<typeof fetchComments.request>) {
  try {
    const fetchAllResponse: CommentsResponse = yield call(fetchCommentsRequest, action.payload);
    yield put(fetchComments.success(fetchAllResponse));
    if (!fetchAllResponse.success) {
      alert('댓글을 서버에서 가져오지 못했습니다');
    }
  } catch (e) {
    yield put(fetchComments.failure(e));
  }
}

function* searchCommentsSaga(action: ReturnType<typeof searchComments.request>) {
  try {
    const searchClubResponse: CommentsResponse = yield call(searchCommentsRequest, action.payload);
    yield put(searchComments.success(searchClubResponse));
    if (!searchClubResponse.success) {
      alert('댓글 검색 중 오류가 발생했습니다');
    }
  } catch (e) {
    yield put(searchComments.failure(e));
  }
}

export function* commentsSaga() {
  yield takeEvery(FETCH_COMMENTS.REQUEST, fetchCommentsSaga);
  yield takeEvery(SEARCH_COMMENTS.REQUEST, searchCommentsSaga);
}
