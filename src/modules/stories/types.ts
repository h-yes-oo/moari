import * as actions from './actions';
import { ActionType } from 'typesafe-actions';
import { StoriesResponse } from '../../api/story';

export type StoriesAction = ActionType<typeof actions>;

export type StoriesState = {
    loading: boolean;
    data: StoriesResponse | null;
    error: Error | null;
}