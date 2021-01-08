import { AuthResponse } from 'store/types';
import axios, { AxiosError } from 'axios';
import { createAsyncAction } from 'typesafe-actions';

export const AUTH = {
    REQUEST: 'AUTH_REQUEST',
    SUCCESS: 'AUTH_SUCCESS',
    FAILURE: 'AUTH_FAILURE'
}

interface AuthPayload {
    history: any;
    option: boolean | null;
    adminRoute: any;
}

export const auth =
    createAsyncAction(
        AUTH.REQUEST,
        AUTH.SUCCESS,
        AUTH.FAILURE
    )<AuthPayload, AuthResponse, AxiosError>();

export async function authRequest({history, option, adminRoute}: AuthPayload) {
    const response = await axios.get('http://localhost:5000/auth',  { withCredentials: true });
    return response.data;
}