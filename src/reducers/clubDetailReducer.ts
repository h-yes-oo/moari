import { ActionType, createReducer } from 'typesafe-actions'

import { Club } from "store/types"
import { addManager, removeManager } from "actions/clubDetail"

const actions = {
  addManager,
  removeManager
}

type Actions = ActionType<typeof actions>
type State = { clubs: Club[], message: string }

const initialState: State = {
  clubs: [],
  message: '',
}

export const clubDetailReducer = createReducer<State, Actions>(initialState)
  .handleAction(addManager, (state, action) => ({
    ...state,
  }))