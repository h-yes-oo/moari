import * as actions from './actions';
import { ActionType } from 'typesafe-actions';
import { ClubListResponse } from '../../api/clubList';

export type ClubListActions = ActionType<typeof actions>

export type ClubListState = {
    loading: boolean;
    error: Error | null;
    data: ClubListResponse | null;
}
