import { ActionType, createReducer } from 'typesafe-actions';

import { User } from 'store/types';
import { getUser, clubLike } from 'actions/user';

const actions = {
  getUser,
  clubLike
}

type UserActions = ActionType<typeof actions>;

type UserState = User

const initialState: UserState = {
  _id: "",
  id: "",
  name: "",
  email: "",
  password: "",
  likes: [],
  token: "",
  tokenExp: 0,
}

export const getUserReducer = createReducer<UserState, UserActions>(initialState)
  .handleAction(getUser.success, (_, action) => ({
    ...action.payload
  }))
  .handleAction(getUser.failure, (state, action) => ({
    ...state,
    message: action.payload.message
  }))

export const clubLikeReducer = createReducer<UserState, UserActions>(initialState)
  .handleAction(clubLike.success, (_, action) => ({
    ...action.payload
  }))
  .handleAction(clubLike.failure, (state, action) => ({
    ...state,
    message: action.payload.message
  }))

export const userReducer = createReducer<UserState, UserActions>(initialState, {
  ...getUserReducer.handlers,
  ...clubLikeReducer.handlers
})
