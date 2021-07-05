import { ActionType } from 'typesafe-actions';

import * as actions from './actions';
import { AuthResponse } from '../../api/auth';

export type AuthAction = ActionType<typeof actions>;

export type AuthState = {
  loading: boolean;
  error: Error | null;
  data: AuthResponse | null;
};
