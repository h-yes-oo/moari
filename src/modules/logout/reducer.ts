import { createReducer } from 'typesafe-actions';

import { LogoutAction, LogoutState } from './types';
import { logoutUser } from './actions';

const initialState: LogoutState = {
  loading: false,
  error: null,
  data: null,
};

const logout = createReducer<LogoutState, LogoutAction>(initialState)
  .handleAction(logoutUser.request, (state) => ({
    ...state,
    loading: true,
    error: null,
    data: null,
  }))
  .handleAction(logoutUser.success, (state, action) => ({
    ...state,
    loading: false,
    error: null,
    data: action.payload,
  }))
  .handleAction(logoutUser.failure, (state, action) => ({
    ...state,
    loading: false,
    error: action.payload,
    data: null,
  }));

export default logout;
