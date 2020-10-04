import { Club, ClubList } from "store/club/types";
import axios, { AxiosError, AxiosResponse } from 'axios';
import { createAsyncAction } from "typesafe-actions";

export const FETCH_CLUB = {
  REQUEST: 'CLUB_FETCH_REQUEST',
  SUCCESS: 'CLUB_FETCH_SUCCESS',
  FAILURE: 'CLUB_FETCH_FAILURE'
}

export const POST_CLUB = {
  REQUEST: 'CLUB_POST_REQUEST',
  SUCCESS: 'CLUB_POST_SUCCESS',
  FAILURE: 'CLUB_POST_FAILURE'
}

export const fetchClubList =
  createAsyncAction(
    FETCH_CLUB.REQUEST, FETCH_CLUB.SUCCESS, FETCH_CLUB.FAILURE
  )<void, ClubList, AxiosError>()

export const fetchClubListRequest = (): Promise<ClubList> => {
  console.log("fetch action working");
  return axios.get('http://localhost:5000/clubs')
  .then(res => res.data);
}

interface PostClubPayload {
  name: string;
  school: string;
  description: string;
  photo: File
}

export const postClub =
  createAsyncAction(
    POST_CLUB.REQUEST, POST_CLUB.SUCCESS, POST_CLUB.FAILURE
  )<PostClubPayload, Club, AxiosError>()

export const postClubRequest = ({ name, school, description, photo }: PostClubPayload): Promise<Club> => {
  console.log("post action working");
  return axios.post('http://localhost:5000/clubs', {
    name: name,
    school: school,
    description: description,
    photo: photo
  })
  .then(res => res.data);
}
