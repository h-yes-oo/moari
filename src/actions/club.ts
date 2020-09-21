import { Club, ClubList } from "store/club/types";
import axios from 'axios';

export const FETCH_CLUBLIST_REQUEST = 'FETCH_CLUBLIST_REQUEST';
export const FETCH_CLUBLIST_SUCCESS = 'FETCH_CLUBLIST_SUCCESS';
export const FETCH_CLUBLIST_FAIL = 'FETCH_CLUBLIST_FAIL';

export const POST_CLUB = 'POST_LIST';

interface GetClubListAction {
  type: typeof FETCH_CLUBLIST_REQUEST | typeof FETCH_CLUBLIST_FAIL
  // payload: ClubList
}

interface GetClubListActionSuccess {
  type: typeof FETCH_CLUBLIST_SUCCESS
  payload: ClubList
}

interface PostClubAction {
  type: typeof POST_CLUB
  payload: Club // need change
}

export const getClubList = (): ClubActionTypes => {  
  console.log('get club action');
  return {
    type: FETCH_CLUBLIST_REQUEST,
  }
}

export const getClubListSuccess = (clubs: ClubList): ClubActionTypes => {
  console.log(clubs);
  return {
    type: FETCH_CLUBLIST_SUCCESS,
    payload: clubs
  }
}

export const postClub = (club: Club): ClubActionTypes => {
  console.log('post club action');
  return {
    type: POST_CLUB,
    payload: club
  }
}

export type ClubActionTypes = GetClubListAction | GetClubListActionSuccess | PostClubAction