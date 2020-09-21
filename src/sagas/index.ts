import { all, takeLatest } from "redux-saga/effects";
import { postsSaga } from "./clubs";

export default function* rootSaga() {
  yield all([
    postsSaga(),
  ])
  // code after all-effect
}

// export default function* rootSaga() {
//   yield fork(saga1)
//   yield fork(saga2)
//   yield fork(saga3)
//   // code after fork-effect
// }