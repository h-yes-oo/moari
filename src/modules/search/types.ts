import * as actions from './actions';
import { ActionType } from 'typesafe-actions';
import { SearchClubResponse } from '../../api/search';

export type SearchActions = ActionType<typeof actions>

export type SearchState = {
    loading: boolean;
    error: Error | null;
    data: SearchClubResponse | null;
}

