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

export interface ClubList {
  clubs: Club[]
}

export interface User {
  _id: string
  id: string
  name: string
  email: string
  password: string
  token: string
  tokenExp: number
}