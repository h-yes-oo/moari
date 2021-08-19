import { ActionType } from 'typesafe-actions';

import * as actions from './actions';
import { FetchClubResponse } from '../../api/fetchSingle';

export type FetchClubActions = ActionType<typeof actions>;

export type FetchClubState = {
  loading: boolean;
  error: Error | null;
  data: FetchClubResponse | null;
};
