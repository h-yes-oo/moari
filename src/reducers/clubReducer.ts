import { ActionType, createReducer, createAsyncAction, action } from 'typesafe-actions'

import { Club } from "store/types"
import { fetchClubsAll, fetchClub, postClub, searchClub } from "actions/club"

const actions = {
  fetchClubsAll,
  fetchClub,
  postClub,
  searchClub
}

type Actions = ActionType<typeof actions>
type State = {
  clubs: Club[]
  message: string
}

const initialState: State = {
  clubs: [],
  message: "",
}

export const fetchAllReducer = createReducer<State, Actions>(initialState)
  .handleAction(fetchClubsAll.request, (state) => ({
    ...state
  }))
  .handleAction(fetchClubsAll.success, (state, action) => ({
    ...state,
    ...action.payload
  }))
  .handleAction(fetchClubsAll.failure, (state, action) => ({
    ...state,
    message: action.payload.message
  }))

export const fetchSingleReducer = createReducer<State, Actions>(initialState)
  .handleAction(fetchClub.request, (state) => ({
    ...state
  }))
  .handleAction(fetchClub.success, (state, action) => ({
    ...state,
    clubs: [action.payload]
  }))
  .handleAction(fetchClub.failure, (state, action) => ({
    ...state,
    message: action.payload.message
  }))

export const postReducer = createReducer<State, Actions>(initialState)
  .handleAction(postClub.request, (state) => ({
    ...state
  }))
  .handleAction(postClub.success, (state, action) => ({
    ...state,
    clubs: [...state.clubs, action.payload]
  }))
  .handleAction(postClub.failure, (state, action) => ({
    ...state,
    message: action.payload.message
  }))

export const searchReducer = createReducer<State, Actions>(initialState)
  .handleAction(searchClub.request, (state) => ({
    ...state
  }))
  .handleAction(searchClub.success, (state, action) => {
    return {
      ...state,
      clubs: action.payload,
      message: ''  
    }
  })
  .handleAction(searchClub.failure, (state, action) => ({
    ...state,
    message: action.payload.message
  }))
