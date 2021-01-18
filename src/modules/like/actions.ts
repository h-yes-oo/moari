import { createAsyncAction } from 'typesafe-actions';
import { LikeClubResponse, LikeClubPayload } from '../../api/like';
import { AxiosError } from 'axios';

export const LIKE_CLUB = {
    REQUEST: 'LIKE_CLUB_REQUEST',
    SUCCESS: 'LIKE_CLUB_SUCCESS',
    FAILURE: 'LIKE_CLUB_FAILURE'
  }

export const likeClub = 
  createAsyncAction(
    LIKE_CLUB.REQUEST, LIKE_CLUB.SUCCESS, LIKE_CLUB.FAILURE
  )<LikeClubPayload, LikeClubResponse, AxiosError>()