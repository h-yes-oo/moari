import { createAsyncAction } from 'typesafe-actions';
import { SignupResponse, SignupUserPayload } from '../../api/signup';
import { AxiosError } from 'axios';

export const SIGNUP_USER = {
    REQUEST: 'USER_SIGNUP_REQUEST',
    SUCCESS: 'USER_SIGNUP_SUCCESS',
    FAILURE: 'USER_SIGNUP_FAILURE'
}

export const signupUser =
  createAsyncAction(
    SIGNUP_USER.REQUEST, SIGNUP_USER.SUCCESS, SIGNUP_USER.FAILURE
)<SignupUserPayload, SignupResponse, AxiosError>()