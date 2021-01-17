import * as actions from './actions';
import { ActionType } from 'typesafe-actions';
import { LoginResponse } from '../../api/login';

export type LoginAction = ActionType<typeof actions>;

export type LoginState = {
    loading: boolean;
    error: Error | null;
    data: LoginResponse | null;
}