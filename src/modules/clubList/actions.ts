import { createAsyncAction } from 'typesafe-actions';
import { AxiosError } from 'axios';

import { ClubListResponse, SearchClubPayload } from '../../api/clubList';

export const FETCH_CLUBS_ALL = {
  REQUEST: 'CLUBS_ALL_FETCH_REQUEST',
  SUCCESS: 'CLUBS_ALL_FETCH_SUCCESS',
  FAILURE: 'CLUBS_ALL_FETCH_FAILURE',
};

export const fetchClubsAll = createAsyncAction(
  FETCH_CLUBS_ALL.REQUEST,
  FETCH_CLUBS_ALL.SUCCESS,
  FETCH_CLUBS_ALL.FAILURE
)<void, ClubListResponse, AxiosError>();

export const SEARCH_CLUB = {
  REQUEST: 'CLUB_SEARCH_REQUEST',
  SUCCESS: 'CLUB_SEARCH_SUCCESS',
  FAILURE: 'CLUB_SEARCH_FAILURE',
};

export const searchClub = createAsyncAction(SEARCH_CLUB.REQUEST, SEARCH_CLUB.SUCCESS, SEARCH_CLUB.FAILURE)<
  SearchClubPayload,
  ClubListResponse,
  AxiosError
>();
