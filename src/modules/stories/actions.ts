import { createAsyncAction } from 'typesafe-actions';
import { FetchStoriesPayload ,StoriesResponse } from '../../api/story';
import { AxiosError } from 'axios';

export const FETCH_STORIES = {
    REQUEST: 'FETCH_STORIES_REQUEST',
    SUCCESS: 'FETCH_STORIES_SUCCESS',
    FAILURE: 'FETCH_STORIES_FAILURE'
}

export const fetchStories =
  createAsyncAction(
    FETCH_STORIES.REQUEST, FETCH_STORIES.SUCCESS, FETCH_STORIES.FAILURE
)<FetchStoriesPayload, StoriesResponse, AxiosError>()
