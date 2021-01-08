import { ActionType, createReducer } from 'typesafe-actions';
import { LoginResponse } from 'store/types';
import { loginUser } from 'actions/login';
import * as actions from 'actions/login';

type LoginAction = ActionType<typeof actions>;

type LoginState = {
    loading: boolean;
    error: Error | null;
    data: LoginResponse | null;
}

const initialState: LoginState = {
    loading: false,
    error: null,
    data: null
};

export const loginReducer = createReducer<LoginState, LoginAction> (initialState)
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