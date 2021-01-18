import { createAsyncAction } from 'typesafe-actions';
import { LoginUserPayload, LoginResponse } from '../../api/login';
import { AxiosError } from 'axios';

export const LOGIN_USER = {
    REQUEST: 'USER_LOGIN_REQUEST',
    SUCCESS: 'USER_LOGIN_SUCCESS',
    FAILURE: 'USER_LOGIN_FAILURE'
}

export const loginUser = 
  createAsyncAction(
    LOGIN_USER.REQUEST, 
    LOGIN_USER.SUCCESS, 
    LOGIN_USER.FAILURE
  )<LoginUserPayload, LoginResponse, AxiosError>()