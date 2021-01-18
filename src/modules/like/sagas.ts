import { likeClub , LIKE_CLUB } from './actions';
import { likeClubRequest, LikeClubResponse } from 'api/like';
import { call, put, takeEvery } from 'redux-saga/effects';
import { act } from 'react-dom/test-utils';

function* likeClubSaga(action: ReturnType<typeof likeClub.request>) {
    try {
      const likeClubResponse : LikeClubResponse = yield call(likeClubRequest, action.payload);
      yield put(likeClub.success(likeClubResponse));
      const { setLikeImg, likeImg } = action.payload;
      if(likeClubResponse.success) {
          setLikeImg(!likeImg);
      } else {
        alert('좋아요 누르기에 실패했습니다.')
      }
    } catch (e) {
      yield put(likeClub.failure(e));
    }
  }

export function* likeSaga() {
    yield takeEvery(LIKE_CLUB.REQUEST, likeClubSaga)
}