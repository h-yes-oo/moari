import * as actions from './actions';
import { ActionType } from 'typesafe-actions';
import { FetchClubResponse } from '../../api/fetchSingle';

export type FetchClubActions = ActionType<typeof actions>

export type FetchClubState = {
    loading: boolean;
    error: Error | null;
    data: FetchClubResponse | null;
}