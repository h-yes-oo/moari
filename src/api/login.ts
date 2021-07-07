import axios from 'axios';

import { USER_SERVER } from 'components/Config';

export async function loginUserRequest({ id, password }: LoginUserPayload) {
  const response = await axios.post<LoginResponse>(
    `${USER_SERVER}/login`,
    {
      id,
      password,
    },
    { withCredentials: true }
  );
  return response.data;
}

export interface LoginUserPayload {
  id: string;
  password: string;
  history: any;
  rememberMe: boolean;
}

export interface LoginResponse {
  loginSuccess: boolean;
  userId: string;
  loginId: string;
  message: string | null;
}
