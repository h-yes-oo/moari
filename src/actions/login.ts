import { LoginResponse } from 'store/types';
import axios, { AxiosError } from 'axios';
import { createAsyncAction } from 'typesafe-actions';
import {USER_SERVER} from 'components/Config'

export const LOGIN_USER = {
    REQUEST: 'USER_LOGIN_REQUEST',
    SUCCESS: 'USER_LOGIN_SUCCESS',
    FAILURE: 'USER_LOGIN_FAILURE'
}

interface LoginUserPayload {
    id: string;
    password: string;
    history: any;
}

export const loginUser = 
  createAsyncAction(
    LOGIN_USER.REQUEST, 
    LOGIN_USER.SUCCESS, 
    LOGIN_USER.FAILURE
  )<LoginUserPayload, LoginResponse, AxiosError>()

export async function loginUserRequest({id,password}: LoginUserPayload) {
  const response = await axios.post<LoginResponse>(`${USER_SERVER}/login`, {
    id,password
  }, { withCredentials: true });
  return response.data;
};