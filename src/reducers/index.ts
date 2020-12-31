import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { fetchReducer, postReducer, searchReducer } from './clubReducer';

import { signupReducer, loginReducer } from './userReducer';

const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ["foodList"],
};

const rootReducer = combineReducers({
    fetch: fetchReducer,
    post: postReducer,
    search: searchReducer,
    signup: signupReducer,
    login: loginReducer
});

export default persistReducer(persistConfig, rootReducer)

// export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
