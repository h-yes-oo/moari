import { LoginResponse } from 'store/types';
import axios, { AxiosError } from 'axios';
import { createAsyncAction } from 'typesafe-actions';

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
  const response = await axios.post<LoginResponse>('http://localhost:5000/login', {
    id,password
  }, { withCredentials: true });
  return response.data;
};