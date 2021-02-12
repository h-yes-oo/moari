import { createAsyncAction } from 'typesafe-actions';
import { DeleteStoryPayload, SaveStoryPayload , StoryResponse } from '../../api/story';
import { AxiosError } from 'axios';

export const DELETE_STORY = {
    REQUEST: 'DELETE_STORY_REQUEST',
    SUCCESS: 'DELETE_STORY_SUCCESS',
    FAILURE: 'DELETE_STORY_FAILURE'
}

export const deleteStory =
  createAsyncAction(
    DELETE_STORY.REQUEST, DELETE_STORY.SUCCESS, DELETE_STORY.FAILURE
)<DeleteStoryPayload, StoryResponse, AxiosError>()

export const SAVE_STORY = {
    REQUEST: 'SAVE_STORY_REQUEST',
    SUCCESS: 'SAVE_STORY_SUCCESS',
    FAILURE: 'SAVE_STORY_FAILURE'
}

export const saveStory =
  createAsyncAction(
    SAVE_STORY.REQUEST, SAVE_STORY.SUCCESS, SAVE_STORY.FAILURE
)<SaveStoryPayload, StoryResponse, AxiosError>()