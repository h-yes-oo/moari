import axios from 'axios';
import { USER_SERVER, CLUB_SERVER } from 'components/Config';

export async function authRequest({history, option, adminRoute}: AuthPayload) {
    const response = await axios.get(`${USER_SERVER}/auth`,  { withCredentials: true });
    return response.data;
}

export interface AuthPayload {
    history: any;
    option: boolean | null;
    adminRoute: any;
}

export interface AuthResponse {
    isAuth: boolean,
    _id: string,
    id: string,
    email: string,
    name: string,
    image: string,
    likedClubs: any[], // string[]
    error: boolean | null
}

export async function likeClubRequest({cludId, userId}: LikeClubPayload) {
    return axios.post<LikeClubResponse>(`${CLUB_SERVER}/${cludId}/like/${userId}`)
    .then(response => response.data)
};

export interface LikeClubPayload {
    cludId: string,
    userId: string,
    setLikeImg : React.Dispatch<React.SetStateAction<boolean>>,
    likeImg : boolean
}

export interface LikeClubResponse {
    success: boolean,
    err: any | null
}
