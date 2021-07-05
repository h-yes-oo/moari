import { ActionType } from 'typesafe-actions';

import * as actions from './actions';
import { CommentsResponse } from '../../api/comments';

export type CommentsAction = ActionType<typeof actions>;

export type CommentsState = {
  loading: boolean;
  data: CommentsResponse | null;
  error: Error | null;
};
