import { ActionType, createReducer } from 'typesafe-actions';

import { User } from 'store/types';
import { clubLike } from 'actions/user';

const actions = {
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

export const clubLikeReducer = createReducer<UserState, UserActions>(initialState)
  .handleAction(clubLike.request, (state) => ({
    ...state
  }))
  .handleAction(clubLike.success, (state, action) => ({
    ...action.payload
  }))
  .handleAction(clubLike.failure, (state, action) => ({
    ...state,
    message: action.payload.message
  }))