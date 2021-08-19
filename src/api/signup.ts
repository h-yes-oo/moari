import axios from 'axios';

import { USER_SERVER } from 'components/Config';

export async function signupUserRequest({ id, name, email, password }: SignupUserPayload) {
  const response = await axios.post<SignupResponse>(`${USER_SERVER}/signup`, {
    id,
    name,
    email,
    password,
  });
  return response.data;
}

export interface SignupUserPayload {
  id: string;
  name: string;
  email: string;
  password: string;
  history: any;
}

export interface SignupResponse {
  success: boolean;
  err: any | null;
}
