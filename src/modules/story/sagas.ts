import { deleteStory, DELETE_STORY, saveStory, SAVE_STORY } from './actions';
import { deleteStoryRequest, saveStoryRequest, StoryResponse } from '../../api/story';
import { call, put, takeEvery } from 'redux-saga/effects';

function* deleteStorySaga(action: ReturnType<typeof deleteStory.request>) {
    try {
      const deleteStoryResponse : StoryResponse = yield call(deleteStoryRequest, action.payload);
      yield put(deleteStory.success(deleteStoryResponse));
      if(!deleteStoryResponse.success) {
          alert('동아리 소식 삭제에 실패했습니다')
      }
    } catch (e) {
      yield put(deleteStory.failure(e));
    }
}

function* saveStorySaga(action: ReturnType<typeof saveStory.request>) {
    try {
      const saveStoryResponse : StoryResponse = yield call(saveStoryRequest, action.payload);
      yield put(saveStory.success(saveStoryResponse));
      if(!saveStoryResponse.success) {
          alert('동아리 소식 등록에 실패했습니다')
      }
    } catch (e) {
      yield put(saveStory.failure(e));
    }
}

export function* storySaga() {
  yield takeEvery(DELETE_STORY.REQUEST, deleteStorySaga);
  yield takeEvery(SAVE_STORY.REQUEST, saveStorySaga);
}