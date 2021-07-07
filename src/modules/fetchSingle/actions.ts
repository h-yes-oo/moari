import { createAsyncAction } from 'typesafe-actions';
import { AxiosError } from 'axios';

import { FetchClubResponse, FetchClubPayload } from '../../api/fetchSingle';

export const FETCH_CLUB_SINGLE = {
  REQUEST: 'CLUB_SINGLE_FETCH_REQUEST',
  SUCCESS: 'CLUB_SINGLE_FETCH_SUCCESS',
  FAILURE: 'CLUB_SINGLE_FETCH_FAILURE',
};

export const fetchClub = createAsyncAction(
  FETCH_CLUB_SINGLE.REQUEST,
  FETCH_CLUB_SINGLE.SUCCESS,
  FETCH_CLUB_SINGLE.FAILURE
)<FetchClubPayload, FetchClubResponse, AxiosError>();
