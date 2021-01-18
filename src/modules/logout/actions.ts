import { createAsyncAction } from 'typesafe-actions';
import { LogoutPayload, LogoutResponse } from 'api/logout';
import { AxiosError } from 'axios';

export const LOGOUT_USER = {
    REQUEST: 'LOGOUT_USER_REQUEST',
    SUCCESS: 'LOGOUT_USER_SUCCESS',
    FAILURE: 'LOGOUT_USER_FAILURE'
}

export const logoutUser = 
  createAsyncAction(
    LOGOUT_USER.REQUEST, 
    LOGOUT_USER.SUCCESS, 
    LOGOUT_USER.FAILURE
  )<LogoutPayload, LogoutResponse, AxiosError>()