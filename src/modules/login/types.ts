import { ActionType } from 'typesafe-actions';

import * as actions from './actions';
import { LoginResponse } from '../../api/login';

export type LoginAction = ActionType<typeof actions>;

export type LoginState = {
  loading: boolean;
  error: Error | null;
  data: LoginResponse | null;
};
