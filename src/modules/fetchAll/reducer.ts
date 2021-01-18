import { createReducer } from 'typesafe-actions';
import { FetchAllActions, FetchAllState } from './types';
import { fetchClubsAll } from './actions';

const initialState: FetchAllState = {
    loading: false,
    error: null,
    data: null
  }

const fetchAll = createReducer<FetchAllState, FetchAllActions>(initialState)
.handleAction(fetchClubsAll.request, (state) => ({
    ...state,
    loading: true,
    error: null,
    data: null
}))
.handleAction(fetchClubsAll.success, (state,action) => ({
    ...state,
    loading: false,
    error: null,
    data: action.payload
}))
.handleAction(fetchClubsAll.failure, (state, action) => ({
    ...state,
    loading: false,
    error: action.payload,
    data: null
}))

export default fetchAll;