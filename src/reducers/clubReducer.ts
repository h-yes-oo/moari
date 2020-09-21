import { act } from "@testing-library/react"
import { ClubActionTypes, FETCH_CLUBLIST_SUCCESS, POST_CLUB } from "actions/club"
import { ClubList } from "store/club/types"

const initialState: ClubList = {
  clubs: [
    // {
    //   name: '',
    //   school: '', 
    //   description: '',
    // }
  ]
}

export const clubReducer = (state = initialState, action: ClubActionTypes): ClubList => {
  switch (action.type) {
    case FETCH_CLUBLIST_SUCCESS:
      console.log('fetch success');
      return {
        ...action.payload
      }
    case POST_CLUB:
      return {
        clubs: [...state.clubs, action.payload]
      }
    default:
      return state
  }
}