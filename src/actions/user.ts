// 필요없는 파일
import axios, { AxiosError, AxiosResponse } from 'axios';
import { createAsyncAction } from "typesafe-actions";

import { AuthResponse, Club, User } from 'store/types';
import { USER_SERVER } from 'components/Config';

export const GET_USER = {
  REQUEST: 'GET_USER_REQUEST',
  SUCCESS: 'GET_USER_SUCCESS',
  FAILURE: 'GET_USER_FAILURE'
}
interface GetUserPayload {
  userId: string;
}

export const getUser = 
  createAsyncAction(
    GET_USER.REQUEST, GET_USER.SUCCESS, GET_USER.FAILURE
  )<GetUserPayload, User, AxiosError>()

export const getUserRequest = ({ userId }: GetUserPayload): Promise<User> => {
  return axios.get(`${USER_SERVER}/${userId}`)
  .then(res => res.data);
}
