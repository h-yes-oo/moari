import { ActionType, createReducer, createAsyncAction, action } from 'typesafe-actions'

import { Club, ClubList } from "store/types"
import { fetchClubList, postClub, searchClub } from "actions/club"
import { ClubStatus } from 'types'

const actions = {
  fetchClubList,
  postClub,
  searchClub
}

type Actions = ActionType<typeof actions>
type State = {
  clubs: Club[],
  message: string
}

const initialState: State = {
  clubs: [],
  message: "",
}

export const fetchReducer = createReducer<State, Actions>(initialState)
  .handleAction(fetchClubList.request, (state) => ({
    ...state
  }))
  .handleAction(fetchClubList.success, (state, action) => ({
    ...state,
    ...action.payload
  }))
  .handleAction(fetchClubList.failure, (state, action) => ({
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
    // ...state,
    console.log("search reducer working");
    console.log(action.payload.clubs);
    return {
      ...state,
      clubs: action.payload.clubs,
      message: ''  
    }
  })
  .handleAction(searchClub.failure, (state, action) => ({
    ...state,
    message: action.payload.message
  }))




