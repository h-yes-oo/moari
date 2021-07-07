import { createAsyncAction } from 'typesafe-actions';
import { AxiosError } from 'axios';

import { FetchCommentsPayload, SearchCommentsPayload, CommentsResponse } from '../../api/comments';

export const FETCH_COMMENTS = {
  REQUEST: 'FETCH_COMMENTS_REQUEST',
  SUCCESS: 'FETCH_COMMENTS_SUCCESS',
  FAILURE: 'FETCH_COMMENTS_FAILURE',
};

export const fetchComments = createAsyncAction(FETCH_COMMENTS.REQUEST, FETCH_COMMENTS.SUCCESS, FETCH_COMMENTS.FAILURE)<
  FetchCommentsPayload,
  CommentsResponse,
  AxiosError
>();

export const SEARCH_COMMENTS = {
  REQUEST: 'SEARCH_COMMENTS_REQUEST',
  SUCCESS: 'SEARCH_COMMENTS_SUCCESS',
  FAILURE: 'SEARCH_COMMENTS_FAILURE',
};

export const searchComments = createAsyncAction(
  SEARCH_COMMENTS.REQUEST,
  SEARCH_COMMENTS.SUCCESS,
  SEARCH_COMMENTS.FAILURE
)<SearchCommentsPayload, CommentsResponse, AxiosError>();
