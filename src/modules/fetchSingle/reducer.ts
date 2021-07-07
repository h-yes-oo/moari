import { createReducer } from 'typesafe-actions';

import { FetchClubActions, FetchClubState } from './types';
import { fetchClub } from './actions';

const initialState: FetchClubState = {
  loading: false,
  error: null,
  data: null,
};

const fetchSingle = createReducer<FetchClubState, FetchClubActions>(initialState)
  .handleAction(fetchClub.request, (state) => ({
    ...state,
    loading: true,
    error: null,
    data: null,
  }))
  .handleAction(fetchClub.success, (state, action) => ({
    ...state,
    loading: false,
    error: null,
    data: action.payload,
  }))
  .handleAction(fetchClub.failure, (state, action) => ({
    ...state,
    loading: false,
    error: action.payload,
    data: null,
  }));

export default fetchSingle;
