import { combineReducers } from 'redux';
import { fetchReducer, postReducer, searchReducer } from './clubReducer';

const rootReducer = combineReducers({
    fetch: fetchReducer,
    post: postReducer,
    search: searchReducer
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
