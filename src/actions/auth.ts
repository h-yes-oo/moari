import { AuthResponse } from 'store/types';
import axios, { AxiosError } from 'axios';
import { createAsyncAction } from 'typesafe-actions';
import { CLUB_SERVER, USER_SERVER } from '../components/Config';

export const AUTH = {
    REQUEST: 'AUTH_REQUEST',
    SUCCESS: 'AUTH_SUCCESS',
    FAILURE: 'AUTH_FAILURE'
}

interface AuthPayload {
    history: any;
    option: boolean | null;
    adminRoute: any;
}

export const auth =
    createAsyncAction(
        AUTH.REQUEST,
        AUTH.SUCCESS,
        AUTH.FAILURE
    )<AuthPayload, AuthResponse, AxiosError>();

export async function authRequest({history, option, adminRoute}: AuthPayload) {
    const response = await axios.get(`${USER_SERVER}/auth`,  { withCredentials: true });
    return response.data;
}

export const CLUB_LIKE = {
    REQUEST: 'CLUB_LIKE_REQUEST',
    SUCCESS: 'CLUB_LIKE_SUCCESS',
    FAILURE: 'CLUB_LIKE_FAILURE'
  }
interface ClubLikePayload {
clubId: string;
userId: string;
}
  
export const clubLike = 
    createAsyncAction(
        CLUB_LIKE.REQUEST, CLUB_LIKE.SUCCESS, CLUB_LIKE.FAILURE
    )<ClubLikePayload, void, AxiosError>()

export const clubLikeRequest = ({ clubId, userId }: ClubLikePayload): Promise<void> => {
    return axios.post(`${CLUB_SERVER}/${clubId}/like/${userId}`)
    .then(res => {
        // console.log(res.data); // { user: ..., club: ... }
        return;
    });
} 