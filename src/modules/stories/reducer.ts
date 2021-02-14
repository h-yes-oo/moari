import { createReducer } from 'typesafe-actions';
import { StoriesAction, StoriesState } from './types';
import { fetchStories } from './actions';

const initialState: StoriesState = {
    loading: false,
    data: null,
    error: null
};

const fetch = createReducer<StoriesState, StoriesAction> (initialState)
    .handleAction(fetchStories.request, (state) => ({
        ...state,
        loading: true,
        error: null,
        data: null
    }))
    .handleAction(fetchStories.success, (state,action) => ({
        ...state,
        loading: false,
        error: null,
        data: action.payload
    }))
    .handleAction(fetchStories.failure, (state, action) => ({
        ...state,
        loading: false,
        error: action.payload,
        data: null
    }))

const stories = createReducer<StoriesState, StoriesAction>(initialState,{
    ...fetch.handlers
})

export default stories;