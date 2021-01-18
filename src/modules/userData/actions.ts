import { createAsyncAction } from 'typesafe-actions';
import { AuthPayload, AuthResponse } from '../../api/auth';
import { AxiosError } from 'axios';

export const AUTH = {
    REQUEST: 'AUTH_REQUEST',
    SUCCESS: 'AUTH_SUCCESS',
    FAILURE: 'AUTH_FAILURE'
}

export const auth =
    createAsyncAction(
        AUTH.REQUEST,
        AUTH.SUCCESS,
        AUTH.FAILURE
    )<AuthPayload, AuthResponse, AxiosError>();