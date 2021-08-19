import { ActionType } from 'typesafe-actions';

import * as actions from './actions';
import { LogoutResponse } from 'api/logout';

export type LogoutAction = ActionType<typeof actions>;

export type LogoutState = {
  loading: boolean;
  error: Error | null;
  data: LogoutResponse | null;
};
