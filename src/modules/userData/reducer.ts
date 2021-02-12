import { createReducer } from 'typesafe-actions';
import { AuthAction, AuthState } from './types';
import { auth, likeClub } from './actions';

const initialState: AuthState = {
    loading: false,
    error: null,
    data: null
}

const userAuth = createReducer<AuthState, AuthAction> (initialState)
    .handleAction(auth.request, (state) => ({
        ...state,
        loading: true,
        error: null,
        //data: null
    }))
    .handleAction(auth.success, (state, action) => ({
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

const like = createReducer<AuthState, AuthAction>(initialState)
    .handleAction(likeClub.request, (state) => ({
        ...state,
    }))
    .handleAction(likeClub.success, (state) => ({
        ...state,
    }))
    .handleAction(likeClub.failure, (state, action) => ({
        ...state,
        error: action.payload,
    }))

const userData = createReducer<AuthState, AuthAction>(initialState, {
    ...userAuth.handlers,
    ...like.handlers
}) 

export default userData;