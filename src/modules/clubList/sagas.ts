import { fetchClubsAll, FETCH_CLUBS_ALL, searchClub, SEARCH_CLUB } from './actions';
import { fetchClubsAllRequest, searchClubRequest, ClubListResponse } from '../../api/clubList';
import { call, put, takeEvery } from 'redux-saga/effects';

function* fetchClubsAllSaga() {
  try {
    const fetchAllResponse : ClubListResponse = yield call(fetchClubsAllRequest);
    yield put(fetchClubsAll.success(fetchAllResponse));
    if(!fetchAllResponse.success) {
      alert('동아리 정보를 서버에서 가져오지 못했습니다');
    }
  } catch (e) {
    yield put(fetchClubsAll.failure(e));
  }
}

function* searchClubSaga(action: ReturnType<typeof searchClub.request>) {
  try {
    const searchClubResponse : ClubListResponse = yield call(searchClubRequest, action.payload);
    yield put(searchClub.success(searchClubResponse));
    if(!searchClubResponse.success) {
      alert('동아리 검색 중 서버에서 오류가 발생했습니다');
    }
  } catch (e) {
    yield put(searchClub.failure(e));
  }
}

export function* clubListSaga() {
  yield takeEvery(FETCH_CLUBS_ALL.REQUEST, fetchClubsAllSaga)
  yield takeEvery(SEARCH_CLUB.REQUEST, searchClubSaga)
}
