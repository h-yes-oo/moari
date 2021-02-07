import { createAsyncAction } from 'typesafe-actions';
import { SearchClubResponse, SearchClubPayload } from '../../api/search';
import { AxiosError } from 'axios';

export const SEARCH_CLUB = {
    REQUEST: 'CLUB_SEARCH_REQUEST',
    SUCCESS: 'CLUB_SEARCH_SUCCESS',
    FAILURE: 'CLUB_SEARCH_FAILURE'
  }

export const searchClub = 
  createAsyncAction(
    SEARCH_CLUB.REQUEST, SEARCH_CLUB.SUCCESS, SEARCH_CLUB.FAILURE
  // AxiosResponse<Club[]>
  )<SearchClubPayload, SearchClubResponse, AxiosError>()