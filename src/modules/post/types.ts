import { ActionType } from 'typesafe-actions';

import * as actions from './actions';
import { PostClubResponse } from '../../api/post';

export type PostClubActions = ActionType<typeof actions>;

export type PostClubState = {
  loading: boolean;
  error: Error | null;
  data: PostClubResponse | null;
};
