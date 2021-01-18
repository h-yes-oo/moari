import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import login, { loginSaga } from './login';
import signup, { signupSaga } from './signup';
import userData, { userDataSaga } from './userData';
import fetchAll, { fetchAllSaga } from './fetchAll';
import search, { searchSaga } from './search';
import fetchSingle, { fetchSingleSaga } from './fetchSingle'
import post, { postSaga } from './post';

const rootReducer = combineReducers({
    login,
    signup,
    userData,
    fetchAll,
    fetchSingle,
    search,
    post
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;

export function* rootSaga() {
    yield all([
        loginSaga(), 
        signupSaga(), 
        userDataSaga(), 
        fetchAllSaga(), 
        fetchSingleSaga(),
        searchSaga(),
        postSaga()
    ]);
}