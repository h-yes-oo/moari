import { searchClub, SEARCH_CLUB } from './actions';
import { searchClubRequest, SearchClubResponse } from '../../api/search';
import { call, put, takeEvery } from 'redux-saga/effects';

function* searchClubSaga(action: ReturnType<typeof searchClub.request>) {
    try {
      const searchClubResponse : SearchClubResponse = yield call(searchClubRequest, action.payload);
      yield put(searchClub.success(searchClubResponse));
      if(!searchClubResponse.success) {
          alert('동아리 검색 중 서버에서 오류 발생');
      }
    } catch (e) {
      yield put(searchClub.failure(e));
    }
  }

export function* searchSaga() {
    yield takeEvery(SEARCH_CLUB.REQUEST, searchClubSaga)
}