import axios from 'axios';

import { USER_SERVER } from 'components/Config';

export async function logoutRequest({ history }: LogoutPayload) {
  return await axios.get(`${USER_SERVER}/logout`, { withCredentials: true }).then((response) => response.data);
}

export interface LogoutPayload {
  history: any;
}

export interface LogoutResponse {
  success: boolean;
  err: any | null;
}
