import * as actions from './actions';
import { ActionType } from 'typesafe-actions';
import { SignupResponse } from '../../api/signup';

export type SignupAction = ActionType<typeof actions>;

export type SignupState = {
    loading: boolean;
    data: SignupResponse | null;
    error: Error | null;
}