import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { fetchReducer, postReducer, searchReducer } from './clubReducer';

const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ["foodList"],
};

const rootReducer = combineReducers({
    fetch: fetchReducer,
    post: postReducer,
    search: searchReducer
});

export default persistReducer(persistConfig, rootReducer)

// export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
