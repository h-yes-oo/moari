import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import login, { loginSaga } from './login';
import signup, { signupSaga } from './signup';
import userData, { userDataSaga, likeSaga } from './userData';
import clubList, { clubListSaga } from './clubList';
import fetchSingle, { fetchSingleSaga } from './fetchSingle'
import post, { postSaga } from './postClub';
import logout, { logoutSaga } from './logout';
import comments, { commentsSaga } from './comments';
import comment, { commentSaga } from './comment';
import stories, { storiesSaga } from './stories';
import story, { storySaga } from './story';
import recruit, { recruitSaga } from './postRecruit';

const rootReducer = combineReducers({
	login,
	logout,
	signup,
	userData,
	clubList,
	fetchSingle,
	post,
	comments,
	comment,
	stories,
	story,
	recruit,
	// like
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;

export function* rootSaga() {
	yield all([
		loginSaga(),
		logoutSaga(),
		signupSaga(), 
		userDataSaga(), 
		clubListSaga(),
		fetchSingleSaga(),
		postSaga(),
		likeSaga(),
		commentsSaga(),
		commentSaga(),
		storiesSaga(),
		storySaga(),
		recruitSaga()
	]);
}