import { createReducer } from 'typesafe-actions';

import { CommentsAction, CommentsState } from './types';
import { fetchComments, searchComments } from './actions';

const initialState: CommentsState = {
  loading: false,
  data: null,
  error: null,
};

const fetch = createReducer<CommentsState, CommentsAction>(initialState)
  .handleAction(fetchComments.request, (state) => ({
    ...state,
    loading: true,
    error: null,
    data: null,
  }))
  .handleAction(fetchComments.success, (state, action) => ({
    ...state,
    loading: false,
    error: null,
    data: action.payload,
  }))
  .handleAction(fetchComments.failure, (state, action) => ({
    ...state,
    loading: false,
    error: action.payload,
    data: null,
  }));

const search = createReducer<CommentsState, CommentsAction>(initialState)
  .handleAction(searchComments.request, (state) => ({
    ...state,
    loading: true,
    error: null,
    data: null,
  }))
  .handleAction(searchComments.success, (state, action) => ({
    ...state,
    loading: false,
    error: null,
    data: action.payload,
  }))
  .handleAction(searchComments.failure, (state, action) => ({
    ...state,
    loading: false,
    error: action.payload,
    data: null,
  }));

const comments = createReducer<CommentsState, CommentsAction>(initialState, {
  ...fetch.handlers,
  ...search.handlers,
});

export default comments;
