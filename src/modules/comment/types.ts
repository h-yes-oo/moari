import { ActionType } from 'typesafe-actions';

import * as actions from './actions';
import { CommentResponse } from '../../api/comments';

export type CommentAction = ActionType<typeof actions>;

export type CommentState = {
  loading: boolean;
  data: CommentResponse | null;
  error: Error | null;
};
