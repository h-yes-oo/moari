import { createReducer } from 'typesafe-actions';

import { ClubListActions, ClubListState } from './types';
import { fetchClubsAll, searchClub } from './actions';

const initialState: ClubListState = {
  loading: false,
  error: null,
  data: null,
};

const fetchAll = createReducer<ClubListState, ClubListActions>(initialState)
  .handleAction(fetchClubsAll.request, (state) => ({
    ...state,
    loading: true,
    error: null,
    data: null,
  }))
  .handleAction(fetchClubsAll.success, (state, action) => ({
    ...state,
    loading: false,
    error: null,
    data: action.payload,
  }))
  .handleAction(fetchClubsAll.failure, (state, action) => ({
    ...state,
    loading: false,
    error: action.payload,
    data: null,
  }));

const search = createReducer<ClubListState, ClubListActions>(initialState)
  .handleAction(searchClub.request, (state) => ({
    ...state,
    loading: true,
    error: null,
    data: null,
  }))
  .handleAction(searchClub.success, (state, action) => ({
    ...state,
    loading: false,
    error: null,
    data: action.payload,
  }))
  .handleAction(searchClub.failure, (state, action) => ({
    ...state,
    loading: false,
    error: action.payload,
    data: null,
  }));

const clubList = createReducer<ClubListState, ClubListActions>(initialState, {
  ...fetchAll.handlers,
  ...search.handlers,
});

export default clubList;
