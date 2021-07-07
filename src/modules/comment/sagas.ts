import { call, put, takeEvery } from 'redux-saga/effects';

import { deleteComment, DELETE_COMMENT, saveComment, SAVE_COMMENT } from './actions';
import { deleteCommentRequest, saveCommentRequest, CommentResponse } from '../../api/comments';

function* deleteCommentSaga(action: ReturnType<typeof deleteComment.request>) {
  try {
    const deleteCommentResponse: CommentResponse = yield call(deleteCommentRequest, action.payload);
    yield put(deleteComment.success(deleteCommentResponse));
    if (!deleteCommentResponse.success) {
      alert('댓글 삭제에 실패했습니다');
    }
  } catch (e) {
    yield put(deleteComment.failure(e));
  }
}

function* saveCommentSaga(action: ReturnType<typeof saveComment.request>) {
  try {
    const saveCommentResponse: CommentResponse = yield call(saveCommentRequest, action.payload);
    yield put(saveComment.success(saveCommentResponse));
    if (!saveCommentResponse.success) {
      alert('댓글 등록에 실패했습니다');
    }
  } catch (e) {
    yield put(saveComment.failure(e));
  }
}

export function* commentSaga() {
  yield takeEvery(DELETE_COMMENT.REQUEST, deleteCommentSaga);
  yield takeEvery(SAVE_COMMENT.REQUEST, saveCommentSaga);
}
