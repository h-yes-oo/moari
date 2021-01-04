import { User } from "store/types";
import axios, { AxiosError } from 'axios';
import { createAsyncAction } from "typesafe-actions";

export const SIGNUP_USER = {
  REQUEST: 'USER_SIGNUP_REQUEST',
  SUCCESS: 'USER_SIGNUP_SUCCESS',
  FAILURE: 'USER_SIGNUP_FAILURE'
}

export const LOGIN_USER = {
  REQUEST: 'USER_LOGIN_REQUEST',
  SUCCESS: 'USER_LOGIN_SUCCESS',
  FAILURE: 'USER_LOGIN_FAILURE'
}

interface SignupUserPayload {
    id: string;
    name: string;
    email: string;
    password: string;
}

interface LoginUserPayload {
  id: string;
  password: string;
}

export const signupUser =
  createAsyncAction(
    SIGNUP_USER.REQUEST, SIGNUP_USER.SUCCESS, SIGNUP_USER.FAILURE
  )<SignupUserPayload, User, AxiosError>()

export const signupUserRequest = ({id, name, email, password}: SignupUserPayload): Promise<User> => {
  console.log("in signupUserRequest");

  // const formData = new FormData();
  
  // formData.append("name", name);
  // formData.append("id", id);
  // formData.append("email", email);
  // formData.append("password", password);


  return axios.post('http://localhost:5000/signup', {
    id,name,email,password
  })
  .then(res => {
    console.log(res.data);
    return res.data;
  });
}

export const loginUser = 
  createAsyncAction(
    LOGIN_USER.REQUEST, LOGIN_USER.SUCCESS, LOGIN_USER.FAILURE
  )<LoginUserPayload, User, AxiosError>()

export const loginUserRequest = ({id,password}: LoginUserPayload): Promise<User> => {
  console.log("in loginUserRequest");
  return axios.post('http://localhost:5000/login', {
    id,password
  })
  .then(res => {
    console.log(res.data);
    return res.data;
  })
}