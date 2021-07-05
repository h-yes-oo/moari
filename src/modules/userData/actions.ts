import { createAsyncAction } from 'typesafe-actions';
import { AxiosError } from 'axios';

import { AuthPayload, AuthResponse, LikeClubPayload, LikeClubResponse } from '../../api/auth';

export const AUTH = {
  REQUEST: 'AUTH_REQUEST',
  SUCCESS: 'AUTH_SUCCESS',
  FAILURE: 'AUTH_FAILURE',
};

export const auth = createAsyncAction(AUTH.REQUEST, AUTH.SUCCESS, AUTH.FAILURE)<
  AuthPayload,
  AuthResponse,
  AxiosError
>();

export const LIKE_CLUB = {
  REQUEST: 'LIKE_CLUB_REQUEST',
  SUCCESS: 'LIKE_CLUB_SUCCESS',
  FAILURE: 'LIKE_CLUB_FAILURE',
};

export const likeClub = createAsyncAction(LIKE_CLUB.REQUEST, LIKE_CLUB.SUCCESS, LIKE_CLUB.FAILURE)<
  LikeClubPayload,
  LikeClubResponse,
  AxiosError
>();
