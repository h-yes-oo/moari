import { fetchClubsAll, FETCH_CLUBS_ALL } from './actions';
import { fetchClubsAllRequest, FetchAllResponse } from '../../api/fetchAll';
import { call, put, takeEvery } from 'redux-saga/effects';

function* fetchClubsAllSaga() {
    try {
      const fetchAllResponse : FetchAllResponse = yield call(fetchClubsAllRequest);
      yield put(fetchClubsAll.success(fetchAllResponse));
      if(!fetchAllResponse.success) {
          alert('동아리 정보를 서버에서 가져오지 못했습니다');
      }
    } catch (e) {
      yield put(fetchClubsAll.failure(e));
    }
  }

export function* fetchAllSaga() {
    yield takeEvery(FETCH_CLUBS_ALL.REQUEST, fetchClubsAllSaga)
}