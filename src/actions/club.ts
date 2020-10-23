import { Club, ClubList } from "store/types";
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
  photos?: FileList;
}

export const postClub =
  createAsyncAction(
    POST_CLUB.REQUEST, POST_CLUB.SUCCESS, POST_CLUB.FAILURE
  )<PostClubPayload, Club, AxiosError>()

export const postClubRequest = ({ name, school, description, photos }: PostClubPayload): Promise<Club> => {
  console.log("post action working");

  const formData = new FormData();
  if (photos) {
    for (let i=0; i<photos.length; i++) {
      formData.append("photos", photos[i]);
    }
  }

  for (var key of formData.entries()) {
    console.log(key[0]);
    console.log(key[1]);
  }

  formData.append("name", name);
  formData.append("school", school);
  formData.append("description", description);

  return axios.post('http://localhost:5000/clubs', formData)
  .then(res => res.data);
}
