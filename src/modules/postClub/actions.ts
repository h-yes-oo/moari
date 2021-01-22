import { createAsyncAction } from 'typesafe-actions';
import { PostClubPayload, PostClubResponse } from '../../api/postClub';
import { AxiosError } from 'axios';

export const POST_CLUB = {
  REQUEST: 'CLUB_POST_REQUEST',
  SUCCESS: 'CLUB_POST_SUCCESS',
  FAILURE: 'CLUB_POST_FAILURE'
}

export const postClub =
createAsyncAction(
  POST_CLUB.REQUEST, POST_CLUB.SUCCESS, POST_CLUB.FAILURE
)<PostClubPayload, PostClubResponse, AxiosError>()
