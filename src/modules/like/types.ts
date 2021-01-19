import * as actions from './actions';
import { ActionType } from 'typesafe-actions';
import { LikeClubResponse } from 'api/like';

export type LikeClubActions = ActionType<typeof actions>

export type LikeClubState = {
    loading: boolean;
    error: Error | null;
    data: LikeClubResponse | null;
}
