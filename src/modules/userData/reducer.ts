import { createReducer } from 'typesafe-actions';
import { AuthAction, AuthState } from './types';
import { auth } from './actions';

const initialState: AuthState = {
    loading: false,
    error: null,
    data: null
}

const userData = createReducer<AuthState, AuthAction> (initialState)
    .handleAction(auth.request, (state) => ({
        ...state,
        loading: true,
        error: null,
        data: null
    }))
    .handleAction(auth.success, (state,action) => ({
        ...state,
        loading: false,
        error: null,
        data: action.payload
    }))
    .handleAction(auth.failure, (state, action) => ({
        ...state,
        loading: false,
        error: action.payload,
        data: null
    }))

export default userData;