import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { fetchAllReducer, fetchSingleReducer, postReducer, searchReducer } from './clubReducer';

import { authReducer } from './authReducer';
import { signupReducer } from './signupReducer';
import { loginReducer } from './loginReducer';
import { clubLikeReducer, userReducer } from './userReducer';

const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: [],
};

const rootReducer = combineReducers({
    fetchAll: fetchAllReducer,
    fetchSingle: fetchSingleReducer,
    post: postReducer,
    search: searchReducer,
    signup: signupReducer,
    login: loginReducer,
    userData: authReducer, // userAuth로 바꾸면 어떨까?
    getUser: userReducer, // userData로 바꾸면 어떨까?
});

export default persistReducer(persistConfig, rootReducer)

// export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
