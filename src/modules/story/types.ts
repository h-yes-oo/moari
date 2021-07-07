import * as actions from './actions';
import { ActionType } from 'typesafe-actions';
import { StoryResponse } from '../../api/story';

export type StoryAction = ActionType<typeof actions>;

export type StoryState = {
    loading: boolean;
    data: StoryResponse | null;
    error: Error | null;
}