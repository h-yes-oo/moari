import { SignupResponse } from 'store/types';
import axios, { AxiosError } from 'axios';
import { createAsyncAction } from 'typesafe-actions';
import { USER_SERVER } from 'components/Config';

export const SIGNUP_USER = {
    REQUEST: 'USER_SIGNUP_REQUEST',
    SUCCESS: 'USER_SIGNUP_SUCCESS',
    FAILURE: 'USER_SIGNUP_FAILURE'
  }

interface SignupUserPayload {
    id: string;
    name: string;
    email: string;
    password: string;
    history: any;
}

export const signupUser =
  createAsyncAction(
    SIGNUP_USER.REQUEST, SIGNUP_USER.SUCCESS, SIGNUP_USER.FAILURE
)<SignupUserPayload, SignupResponse, AxiosError>()

export async function signupUserRequest ({id, name, email, password}: SignupUserPayload) {
    const response = await axios.post<SignupResponse>(`${USER_SERVER}/signup`, {
        id,name,email,password
    });
    return response.data;
};