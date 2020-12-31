import { ActionType, createReducer } from 'typesafe-actions';
import { User } from "store/types"
import { signupUser, signupUserRequest , loginUser } from "actions/user" 

const actions = {
    signupUser,
    loginUser
}

type Actions = ActionType<typeof actions>

type State = {
    users: User[],
    message: string
}

const initialState: State = {
    users: [],
    message: "" ,
}

export const signupReducer = createReducer<State,Actions>(initialState)
    .handleAction(signupUser.request, (state) => ({
        ...state
    }))
    .handleAction(signupUser.success, (state,action) => ({
        ...state,
        users: [...state.users, action.payload]
    }))
    .handleAction(signupUser.failure, (state, action) => ({
        ...state,
        message: action.payload.message,
    }))
    
export const loginReducer = createReducer<State, Actions>(initialState)
    // .handleAction(loginUser.request, (state) => ({
    //     ...state
    // }))
    .handleAction(loginUser.success, (state,action) => ({
        ...state
    }))
    .handleAction(loginUser.failure, (state,action) => ({
        ...state,
        message: action.payload.message,
    }))