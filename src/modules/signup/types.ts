import { ActionType } from 'typesafe-actions';

import * as actions from './actions';
import { SignupResponse } from '../../api/signup';

export type SignupAction = ActionType<typeof actions>;

export type SignupState = {
  loading: boolean;
  data: SignupResponse | null;
  error: Error | null;
};
