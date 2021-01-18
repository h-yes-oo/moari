import { fetchClub, FETCH_CLUB_SINGLE } from './actions';
import { fetchClubSingleRequest, FetchClubResponse } from '../../api/fetchSingle';
import { call, put, takeEvery } from 'redux-saga/effects';

function* fetchClubSaga(action: ReturnType<typeof fetchClub.request>) {
    try {
      const fetchClubResponse : FetchClubResponse = yield call(fetchClubSingleRequest, action.payload);
      yield put(fetchClub.success(fetchClubResponse));
      if(!fetchClubResponse.success) {
          alert('해당 동아리 정보를 서버에서 가져오지 못했습니다');
      }
    } catch (e) {
      yield put(fetchClub.failure(e));
    }
  }

export function* fetchSingleSaga() {
    yield takeEvery(FETCH_CLUB_SINGLE.REQUEST, fetchClubSaga)
}