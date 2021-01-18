import { createReducer } from 'typesafe-actions';
import { PostClubActions, PostClubState } from './types';
import { postClub } from './actions';

const initialState: PostClubState = {
    loading: false,
    error: null,
    data: null
  }

const post = createReducer<PostClubState, PostClubActions>(initialState)
.handleAction(postClub.request, (state) => ({
    ...state,
    loading: true,
    error: null,
    data: null
}))
.handleAction(postClub.success, (state,action) => ({
    ...state,
    loading: false,
    error: null,
    data: action.payload
}))
.handleAction(postClub.failure, (state, action) => ({
    ...state,
    loading: false,
    error: action.payload,
    data: null
}))

export default post;