import * as actions from './actions';
import { ActionType } from 'typesafe-actions';
import { PostRecruitResponse } from '../../api/recruit';

export type PostRecruitActions = ActionType<typeof actions>

export type PostRecruitState = {
    loading: boolean;
    error: Error | null;
    data: PostRecruitResponse | null;
}
