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

export const SEARCH_CLUB = {
  REQUEST: 'CLUB_SEARCH_REQUEST',
  SUCCESS: 'CLUB_SEARCH_SUCCESS',
  FAILURE: 'CLUB_SEARCH_FAILURE'
}

export const fetchClubList =
  createAsyncAction(
    FETCH_CLUB.REQUEST, FETCH_CLUB.SUCCESS, FETCH_CLUB.FAILURE
  // AxiosResponse<ClubList>?
  )<void, ClubList, AxiosError>()

export const fetchClubListRequest = (): Promise<ClubList> => {
  // console.log("fetch action working");
  return axios.get('http://localhost:5000/clubs')
  // res.json()
  .then(res => res.data);
}

interface PostClubPayload {
  name: string;
  school: string;
  description: string;
  photos?: FileList;
  category: string;
  tags: string[];
  status: string;
}

export const postClub =
  createAsyncAction(
    POST_CLUB.REQUEST, POST_CLUB.SUCCESS, POST_CLUB.FAILURE
  // AxiosResponse<Club>
  )<PostClubPayload, Club, AxiosError>()

export const postClubRequest = ({ name, school, description, photos, category, tags, status }: PostClubPayload): Promise<Club> => {
  console.log("post action working");

  const formData = new FormData();
  
  formData.append("name", name);
  formData.append("school", school);
  formData.append("description", description);
  formData.append("tags", JSON.stringify(tags));
  formData.append("category", category);
  formData.append("status", status);

  if (photos) {
    for (let i=0; i<photos.length; i++) {
      formData.append("photos", photos[i]);
    }
  }

  // for (var key of formData.entries()) {
  //   console.log(key[0]);
  //   console.log(key[1]);
  // }

  return axios.post('http://localhost:5000/clubs', formData)
  // as Club
  .then(res => {
    console.log(res.data);
    return res.data;
  });
}

interface SearchClubPayload {
  keyword: string;
}

export const searchClub = 
  createAsyncAction(
    SEARCH_CLUB.REQUEST, SEARCH_CLUB.SUCCESS, SEARCH_CLUB.FAILURE
  // AxiosResponse<ClubList>
  )<SearchClubPayload, ClubList, AxiosError>()

export const searchClubRequest = ({ keyword }: SearchClubPayload): Promise<ClubList> => {
  // console.log("search action working");
  return axios.get(`http://localhost:5000/search/${keyword}`)
  .then(res => res.data);
}