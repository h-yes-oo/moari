import { createReducer } from 'typesafe-actions';
import { PostRecruitActions, PostRecruitState } from './types';
import { postRecruit } from './actions';

const initialState: PostRecruitState = {
    loading: false,
    error: null,
    data: null
}

const recruit = createReducer<PostRecruitState, PostRecruitActions>(initialState)
  .handleAction(postRecruit.request, (state) => ({
      ...state,
      loading: true,
      error: null,
      data: null
  }))
  .handleAction(postRecruit.success, (state,action) => ({
      ...state,
      loading: false,
      error: null,
      data: action.payload
  }))
  .handleAction(postRecruit.failure, (state, action) => ({
      ...state,
      loading: false,
      error: action.payload,
      data: null
  }))

export default recruit;