import { createReducer } from 'typesafe-actions';
import { LoginAction, LoginState } from './types';
import { loginUser } from './actions';

const initialState: LoginState = {
    loading: false,
    error: null,
    data: null
};

const login = createReducer<LoginState, LoginAction> (initialState)
    .handleAction(loginUser.request, (state) => ({
        ...state,
        loading: true,
        error: null,
        data: null
    }))
    .handleAction(loginUser.success, (state,action) => ({
        ...state,
        loading: false,
        error: null,
        data: action.payload
    }))
    .handleAction(loginUser.failure, (state, action) => ({
        ...state,
        loading: false,
        error: action.payload,
        data: null
    }))

export default login;