
import axios, { AxiosError, AxiosResponse } from 'axios';
import { createAsyncAction } from "typesafe-actions";

import { User } from 'store/types';

export const CLUB_LIKE = {
  REQUEST: 'CLUB_LIKE_REQUEST',
  SUCCESS: 'CLUB_LIKE_SUCCESS',
  FAILURE: 'CLUB_LIKE_FAILURE'
}

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