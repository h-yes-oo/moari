import { ActionType, createReducer } from 'typesafe-actions';
import { AuthResponse } from 'store/types';
import { auth } from 'actions/auth';
import * as actions from 'actions/auth';

type AuthAction = ActionType<typeof actions>;

type AuthState = {
    loading: boolean;
    error: Error | null;
    data: AuthResponse | null;
}

const initialState: AuthState = {
    loading: false,
    error: null,
    data: null
}

export const authReducer = createReducer<AuthState, AuthAction> (initialState)
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