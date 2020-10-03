import { ActionType, createReducer, createAsyncAction, action } from 'typesafe-actions'

import { Club, ClubList } from "store/club/types"
import { fetchClubList, postClub } from "actions/club"
import { ClubStatus } from 'types'

const actions = {
  fetchClubList,
  postClub
}

type Actions = ActionType<typeof actions>
type State = { clubs: Club[], message: string }

const initialState: State = {
  clubs: [],
  message: '',
}

export const clubReducer = createReducer<State, Actions>(initialState)
  // .handleAction(fetchClubList.request, (state) => ({
  //   ...state,
  // }))
  .handleAction(fetchClubList.success, (state, action) => ({
    ...state,
    ...action.payload
  }))
  .handleAction(fetchClubList.failure, (state, action) => ({
    ...state,
    message: action.payload.message
  }))
  // .handleAction(postClub.request, (state) => ({
  //   ...state,
  // }))
  .handleAction(postClub.success, (state, action) => ({
    ...state,
    clubs: [...state.clubs, action.payload],
  }))
  // .handleAction(postClub.failure, (state, action) => ({
  //   ...state,
  //   message: action.payload.message
  // }))


