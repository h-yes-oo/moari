import { ActionType, createReducer, createAsyncAction, action } from 'typesafe-actions'

import { Club, ClubList } from "store/club/types"
import { fetchClubList } from "actions/club"

const actions = {
  fetchClubList,
  // postClub
}

type Actions = ActionType<typeof actions>
type State = { clubs: Club[], message: string }

const initialState: State = {
  clubs: [],
  message: '',
}

export const clubReducer = createReducer<State, Actions>(initialState)
  .handleAction(fetchClubList.success, (state, action) => ({
    ...state,
    ...action.payload
  }))
  .handleAction(fetchClubList.failure, (state, action) => ({
    ...state,
    message: action.payload.message
  }))
  // .handleAction(fetchClubList.request, (state) => ({
  //   ...state,
  // }))
