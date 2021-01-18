import axios from 'axios';
import { USER_SERVER } from 'components/Config'

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
    error: boolean | null,
    likes: [any]
  }