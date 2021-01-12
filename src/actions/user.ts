
import axios, { AxiosError, AxiosResponse } from 'axios';
import { createAsyncAction } from "typesafe-actions";
import { handleActions, createAction } from 'redux-actions';

import { User } from 'store/types';
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

export const CLUB_LIKE = {
  REQUEST: 'CLUB_LIKE_REQUEST',
  SUCCESS: 'CLUB_LIKE_SUCCESS',
  FAILURE: 'CLUB_LIKE_FAILURE'
}

export const clubLikeAsync = createAction(CLUB_LIKE.REQUEST);
interface ClubLikePayload {
  clubId: string;
  userId: string;
}

export const clubLike = 
  createAsyncAction(
    CLUB_LIKE.REQUEST, CLUB_LIKE.SUCCESS, CLUB_LIKE.FAILURE
  )<ClubLikePayload, User, AxiosError>()

export const clubLikeRequest = ({ clubId, userId }: ClubLikePayload): Promise<User> => {
  return axios.post(`http://localhost:5000/clubs/${clubId}/like/${userId}`)
  .then(res => res.data);
} 