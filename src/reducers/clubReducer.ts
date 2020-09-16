import { ClubActionTypes, GET_CLUBLIST, POST_CLUB } from "actions/club"
import { ClubList } from "store/club/types"

const initialState: ClubList = {
  clubs: []
}

export function clubReducer(
  state = initialState,
  action: ClubActionTypes
): ClubList {
  switch (action.type) {
    case GET_CLUBLIST:
      return {
        clubs: []
      }
    case POST_CLUB:
      return {
        clubs: [...state.clubs, action.payload]
      }
    default:
      return state
  }
}