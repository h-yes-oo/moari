import { Club, ClubList } from "store/club/types";
import axios, { AxiosError, AxiosResponse } from 'axios';
import { createAsyncAction } from "typesafe-actions";

export const FETCH_CLUB = {
  REQUEST: 'CLUB_FETCH_REQUEST',
  SUCCESS: 'CLUB_FETCH_SUCCESS',
  FAILURE: 'CLUB_FETCH_FAILURE'
}

// const POST_CLUB = {
//   REQUEST: 'CLUB_POST_REQUEST',
//   SUCCESS: 'CLUB_POST_SUCCESS',
//   FAILURE: 'CLUB_POST_FAILURE'
// }

export const fetchClubList =
  createAsyncAction(
    FETCH_CLUB.REQUEST, FETCH_CLUB.SUCCESS, FETCH_CLUB.FAILURE
  )<void, AxiosResponse<ClubList>, AxiosError>()

export const fetchClubListRequest = (): Promise<ClubList> => {
  console.log("fetch action working");
  return axios.get('http://localhost:5000/clubs')
  .then(res => res.data);
}
