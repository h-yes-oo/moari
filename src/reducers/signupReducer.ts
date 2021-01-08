import { ActionType, createReducer } from 'typesafe-actions';
import { User, SignupResponse } from 'store/types';
import { signupUser, SIGNUP_USER } from 'actions/signup';
import * as actions from 'actions/signup';

type SignupAction = ActionType<typeof actions>;

type SignupState = {
    loading: boolean;
    data: SignupResponse | null;
    error: Error | null;
}

const initialState: SignupState = {
    loading: false,
    data: null,
    error: null
};

export const signupReducer = createReducer<SignupState, SignupAction> (initialState)
    .handleAction(signupUser.request, (state) => ({
        ...state,
        loading: true,
        error: null,
        data: null
    }))
    .handleAction(signupUser.success, (state,action) => ({
        ...state,
        loading: false,
        error: null,
        data: action.payload
    }))
    .handleAction(signupUser.failure, (state, action) => ({
        ...state,
        loading: false,
        error: action.payload,
        data: null
    }))