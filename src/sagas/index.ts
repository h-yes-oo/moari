import { takeEvery, call, put } from 'redux-saga/effects'

import { fetchClubListRequest, postClub, postClubRequest, searchClub, searchClubRequest } from 'actions/club'
import { AxiosResponse } from 'axios'
import { Club } from 'store/types'

function* fetchClubSaga(): Generator {
  try {
    const clubs = yield call(fetchClubListRequest)
    yield put({ type: 'CLUB_FETCH_SUCCESS', payload: { clubs: clubs } })
  } catch (e) {
    yield put({ type: 'CLUB_FETCH_FAILURE', payload: { message: e.message } })
  }
}

function* postClubSaga(action: ReturnType<typeof postClub.request>): Generator {
  try {
    const club = yield call(postClubRequest, action.payload);
    // yield put(postClub.success(club));
    yield put({ type: 'CLUB_POST_SUCCESS', payload: { club: club } })
  } catch (e) {
    yield put({ type: 'CLUB_POST_FAILURE', payload: { message: e.message } })
    // yield put(postClub.failure(e))
  }
}

function* searchClubSaga(action: ReturnType<typeof searchClub.request>): Generator {
  try {
    const clubs = yield call(searchClubRequest, action.payload);
    yield put({ type: 'CLUB_SEARCH_SUCCESS', payload: { clubs: clubs } });
  } catch (e) {
    yield put({ type: 'CLUB_SEARCH_FAILURE', payload: { message: e.message } });
  }
}

function* addManagerToClubSaga(): Generator {
  try {

  } catch (e) {

  }
}

function* removeManagerFromClubSaga(): Generator {
  try {

  } catch (e) {

  }
}

export default function* sagas() {
  // takeEvery로 CLUB_FETCH_REQUEST를 지속적으로 감시
  yield takeEvery("CLUB_FETCH_REQUEST", fetchClubSaga)
  yield takeEvery("CLUB_POST_REQUEST", postClubSaga)
  yield takeEvery("CLUB_SEARCH_REQUEST", searchClubSaga)
  // yield takeEvery("ADD_MANAGER", addManagerToClubSaga)
  // yield takeEvery("REMOVE_MANAGER", removeManagerFromClubSaga)
}
