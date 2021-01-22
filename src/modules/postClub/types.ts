import * as actions from './actions';
import { ActionType } from 'typesafe-actions';
import { PostClubResponse } from '../../api/postClub';

export type PostClubActions = ActionType<typeof actions>

export type PostClubState = {
    loading: boolean;
    error: Error | null;
    data: PostClubResponse | null;
}

