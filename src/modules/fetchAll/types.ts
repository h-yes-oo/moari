import * as actions from './actions';
import { ActionType } from 'typesafe-actions';
import { FetchAllResponse } from '../../api/fetchAll';

export type FetchAllActions = ActionType<typeof actions>

export type FetchAllState = {
    loading: boolean;
    error: Error | null;
    data: FetchAllResponse | null;
}