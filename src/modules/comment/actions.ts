import { createAsyncAction } from 'typesafe-actions';
import { DeleteCommentPayload, SaveCommentPayload , CommentResponse } from '../../api/comments';
import { AxiosError } from 'axios';

export const DELETE_COMMENT = {
    REQUEST: 'DELETE_COMMENT_REQUEST',
    SUCCESS: 'DELETE_COMMENT_SUCCESS',
    FAILURE: 'DELETE_COMMENT_FAILURE'
}

export const deleteComment =
  createAsyncAction(
    DELETE_COMMENT.REQUEST, DELETE_COMMENT.SUCCESS, DELETE_COMMENT.FAILURE
)<DeleteCommentPayload, CommentResponse, AxiosError>()

export const SAVE_COMMENT = {
    REQUEST: 'SAVE_COMMENT_REQUEST',
    SUCCESS: 'SAVE_COMMENT_SUCCESS',
    FAILURE: 'SAVE_COMMENT_FAILURE'
}

export const saveComment =
  createAsyncAction(
    SAVE_COMMENT.REQUEST, SAVE_COMMENT.SUCCESS, SAVE_COMMENT.FAILURE
)<SaveCommentPayload, CommentResponse, AxiosError>()