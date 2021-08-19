import { createAsyncAction } from 'typesafe-actions';
import { AxiosError } from 'axios';

import { LoginUserPayload, LoginResponse } from '../../api/login';

export const LOGIN_USER = {
  REQUEST: 'USER_LOGIN_REQUEST',
  SUCCESS: 'USER_LOGIN_SUCCESS',
  FAILURE: 'USER_LOGIN_FAILURE',
};

export const loginUser = createAsyncAction(LOGIN_USER.REQUEST, LOGIN_USER.SUCCESS, LOGIN_USER.FAILURE)<
  LoginUserPayload,
  LoginResponse,
  AxiosError
>();
