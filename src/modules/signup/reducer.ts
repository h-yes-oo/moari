import { createReducer } from 'typesafe-actions';

import { SignupAction, SignupState } from './types';
import { signupUser } from './actions';

const initialState: SignupState = {
  loading: false,
  data: null,
  error: null,
};

const signup = createReducer<SignupState, SignupAction>(initialState)
  .handleAction(signupUser.request, (state) => ({
    ...state,
    loading: true,
    error: null,
    data: null,
  }))
  .handleAction(signupUser.success, (state, action) => ({
    ...state,
    loading: false,
    error: null,
    data: action.payload,
  }))
  .handleAction(signupUser.failure, (state, action) => ({
    ...state,
    loading: false,
    error: action.payload,
    data: null,
  }));

export default signup;
