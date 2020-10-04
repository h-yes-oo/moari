import { combineReducers } from 'redux';
import { clubReducer } from './clubReducer';

const rootReducer = combineReducers({
    club: clubReducer
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
