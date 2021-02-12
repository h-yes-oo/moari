import * as actions from './actions';
import { ActionType } from 'typesafe-actions';
import { CommentResponse } from '../../api/comments';

export type CommentAction = ActionType<typeof actions>;

export type CommentState = {
    loading: boolean;
    data: CommentResponse | null;
    error: Error | null;
}