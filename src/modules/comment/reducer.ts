import { createReducer } from 'typesafe-actions';
import { CommentAction, CommentState } from './types';
import { deleteComment, saveComment } from './actions';

const initialState: CommentState = {
    loading: false,
    data: null,
    error: null
};

const deleteReducer = createReducer<CommentState, CommentAction> (initialState)
    .handleAction(deleteComment.request, (state) => ({
        ...state,
        loading: true,
        error: null,
        data: null
    }))
    .handleAction(deleteComment.success, (state,action) => ({
        ...state,
        loading: false,
        error: null,
        data: action.payload
    }))
    .handleAction(deleteComment.failure, (state, action) => ({
        ...state,
        loading: false,
        error: action.payload,
        data: null
    }))

const saveReducer = createReducer<CommentState, CommentAction> (initialState)
    .handleAction(saveComment.request, (state) => ({
        ...state,
        loading: true,
        error: null,
        data: null
    }))
    .handleAction(saveComment.success, (state,action) => ({
        ...state,
        loading: false,
        error: null,
        data: action.payload
    }))
    .handleAction(saveComment.failure, (state, action) => ({
        ...state,
        loading: false,
        error: action.payload,
        data: null
    }))

const comment = createReducer<CommentState, CommentAction>(initialState,{
    ...deleteReducer.handlers,
    ...saveReducer.handlers
})

export default comment;