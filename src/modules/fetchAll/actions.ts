import { createAsyncAction } from 'typesafe-actions';
import { FetchAllResponse } from '../../api/fetchAll';
import { AxiosError } from 'axios';

export const FETCH_CLUBS_ALL = {
    REQUEST: 'CLUBS_ALL_FETCH_REQUEST',
    SUCCESS: 'CLUBS_ALL_FETCH_SUCCESS',
    FAILURE: 'CLUBS_ALL_FETCH_FAILURE'
  }

export const fetchClubsAll =
  createAsyncAction(
    FETCH_CLUBS_ALL.REQUEST, FETCH_CLUBS_ALL.SUCCESS, FETCH_CLUBS_ALL.FAILURE
  // AxiosResponse<Club[]>?
  )<void, FetchAllResponse, AxiosError>()