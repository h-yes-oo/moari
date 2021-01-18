import { createReducer } from 'typesafe-actions';
import { LikeClubActions, LikeClubState } from './types';
import { likeClub } from './actions';

const initialState: LikeClubState = {
    loading: false,
    error: null,
    data: null
  }

const like = createReducer<LikeClubState, LikeClubActions>(initialState)
.handleAction(likeClub.request, (state) => ({
    ...state,
    loading: true,
    error: null,
    data: null
}))
.handleAction(likeClub.success, (state,action) => ({
    ...state,
    loading: false,
    error: null,
    data: action.payload
}))
.handleAction(likeClub.failure, (state, action) => ({
    ...state,
    loading: false,
    error: action.payload,
    data: null
}))

export default like;