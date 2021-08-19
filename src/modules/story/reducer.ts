import { createReducer } from 'typesafe-actions';
import { StoryAction, StoryState } from './types';
import { deleteStory, saveStory } from './actions';

const initialState: StoryState = {
    loading: false,
    data: null,
    error: null
};

const deleteReducer = createReducer<StoryState, StoryAction> (initialState)
    .handleAction(deleteStory.request, (state) => ({
        ...state,
        loading: true,
        error: null,
        data: null
    }))
    .handleAction(deleteStory.success, (state,action) => ({
        ...state,
        loading: false,
        error: null,
        data: action.payload
    }))
    .handleAction(deleteStory.failure, (state, action) => ({
        ...state,
        loading: false,
        error: action.payload,
        data: null
    }))

const saveReducer = createReducer<StoryState, StoryAction> (initialState)
    .handleAction(saveStory.request, (state) => ({
        ...state,
        loading: true,
        error: null,
        data: null
    }))
    .handleAction(saveStory.success, (state,action) => ({
        ...state,
        loading: false,
        error: null,
        data: action.payload
    }))
    .handleAction(saveStory.failure, (state, action) => ({
        ...state,
        loading: false,
        error: action.payload,
        data: null
    }))

const story = createReducer<StoryState, StoryAction>(initialState,{
    ...deleteReducer.handlers,
    ...saveReducer.handlers
})

export default story;