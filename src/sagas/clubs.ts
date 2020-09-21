import { getClubList, FETCH_CLUBLIST_REQUEST, FETCH_CLUBLIST_SUCCESS, FETCH_CLUBLIST_FAIL, ClubActionTypes, getClubListSuccess } from 'actions/club'
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import axios from 'axios';

// export default function* rootSaga() {
//   takeLatest(FETCH_CLUBLIST_REQUEST, getClubList$)
// }

// function* watchFetchProducts() {
//   yield takeEvery('PRODUCTS_REQUESTED', fetchProducts)
// }

// function* fetchProducts() {
//   const products = yield Api.fetch('/products')
//   console.log(products)
// }

export function* postsSaga() {
  // yield takeEvery(FETCH_CLUBLIST_REQUEST, getClubList$);
  yield takeLatest(FETCH_CLUBLIST_REQUEST, getClubList$);
}

function* getClubList$(action: ClubActionTypes) {
  console.log('saga working');
  try {
    // TODO: call 내부 api 호출 함수 분리
    const clubs = yield call(() => axios.get('http://localhost:5000/clubs').then(response => response.data));
    // put: dispatch action to store
    // yield put({ type: FETCH_CLUBLIST_SUCCESS, payload: clubs })
    yield put(getClubListSuccess(clubs))
  } catch (err) {
    yield put({
      type: FETCH_CLUBLIST_FAIL,
      // error: true,
      payload: err
    });
  } finally {
    console.log('clear saga call');
  }
}
