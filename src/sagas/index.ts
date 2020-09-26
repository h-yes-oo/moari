import { takeEvery, call, put } from 'redux-saga/effects'

import { fetchClubListRequest } from 'actions/club'

function* fetchClubSaga(): Generator {
  console.log('saga working');
  try {
    const clubs = yield call(fetchClubListRequest)
    yield put({ type: 'CLUB_FETCH_SUCCESS', payload: { clubs: clubs } })
  } catch (e) {
    yield put({ type: 'CLUB_FETCH_FAILURE', payload: { message: e.message } })
  }
}

export default function* sagas() {
  // takeEvery로 CLUB_FETCH_REQUEST를 지속적으로 감시
  yield takeEvery("CLUB_FETCH_REQUEST", fetchClubSaga)
}
