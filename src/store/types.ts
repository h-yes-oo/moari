import * as T from 'types';
export interface Club {
  _id: string
  name: string
  school: string
  description: string
  photos: any[]
  status: T.Status;
  category?: string
  tags?: string[]
  // managerIds: string[]
}

export interface User {
  _id: string
  id: string
  name: string
  email: string
  password: string
  likes: Club[]
  token: string
  tokenExp: number
}

export interface LoginResponse {
  loginSuccess: boolean,
  userId: string,
  loginId: string,
  message: string | null
}

export interface SignupResponse {
  success: boolean;
  err : any | null;
}

export interface AuthResponse {
  _id: string,
  isAuth: boolean,
  email: string,
  name: string,
  image: string,
  error: boolean | null
}