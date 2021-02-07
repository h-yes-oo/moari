import { createReducer } from 'typesafe-actions';
import { SearchActions, SearchState } from './types';
import { searchClub } from './actions';

const initialState: SearchState = {
    loading: false,
    error: null,
    data: null
  }

const search = createReducer<SearchState, SearchActions>(initialState)
.handleAction(searchClub.request, (state) => ({
    ...state,
    loading: true,
    error: null,
    data: null
}))
.handleAction(searchClub.success, (state,action) => ({
    ...state,
    loading: false,
    error: null,
    data: action.payload
}))
.handleAction(searchClub.failure, (state, action) => ({
    ...state,
    loading: false,
    error: action.payload,
    data: null
}))

export default search;