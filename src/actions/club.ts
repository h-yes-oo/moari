import { Club } from "store/types";
import axios, { AxiosError, AxiosResponse } from 'axios';
import { createAsyncAction } from "typesafe-actions";

export const FETCH_CLUBS_ALL = {
  REQUEST: 'CLUBS_ALL_FETCH_REQUEST',
  SUCCESS: 'CLUBS_ALL_FETCH_SUCCESS',
  FAILURE: 'CLUBS_ALL_FETCH_FAILURE'
}

export const FETCH_CLUB_SINGLE = {
  REQUEST: 'CLUB_SINGLE_FETCH_REQUEST',
  SUCCESS: 'CLUB_SINGLE_FETCH_SUCCESS',
  FAILURE: 'CLUB_SINGLE_FETCH_FAILURE'
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

export const fetchClubsAll =
  createAsyncAction(
    FETCH_CLUBS_ALL.REQUEST, FETCH_CLUBS_ALL.SUCCESS, FETCH_CLUBS_ALL.FAILURE
  // AxiosResponse<Club[]>?
  )<void, Club[], AxiosError>()

export const fetchClubsAllRequest = (): Promise<Club[]> => {
  return axios.get('http://localhost:5000/clubs')
  // res.json()
  .then(res => res.data);
}

interface FetchClubPayload {
  id: string;
}

export const fetchClub =
  createAsyncAction(
    FETCH_CLUB_SINGLE.REQUEST, FETCH_CLUB_SINGLE.SUCCESS, FETCH_CLUB_SINGLE.FAILURE
  )<FetchClubPayload, Club, AxiosError>()

export const fetchClubSingleRequest = ({ id }: FetchClubPayload): Promise<Club> => {
  return axios.get(`http://localhost:5000/clubs/${id}`)
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
  // AxiosResponse<Club[]>
  )<SearchClubPayload, Club[], AxiosError>()

export const searchClubRequest = ({ keyword }: SearchClubPayload): Promise<Club[]> => {
  // console.log("search action working");
  return axios.get(`http://localhost:5000/search/${keyword}`)
  .then(res => res.data);
}