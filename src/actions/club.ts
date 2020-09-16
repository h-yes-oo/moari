import { Club, ClubList } from "store/club/types";

export const GET_CLUBLIST = 'GET_CLUBLIST';
export const POST_CLUB = 'POST_LIST';

interface GetClubListAction {
  type: typeof GET_CLUBLIST
}

interface PostClubAction {
  type: typeof POST_CLUB
  payload: Club // need change
}

export function getClubList(): ClubActionTypes {
  console.log('get club action');
  return {
    type: GET_CLUBLIST
  }
}

export function postClub(club: Club): ClubActionTypes {
  console.log('post club action');
  return {
    type: POST_CLUB,
    payload: club
  }
}

export type ClubActionTypes = GetClubListAction | PostClubAction