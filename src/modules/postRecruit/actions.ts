import { createAsyncAction } from 'typesafe-actions';
import { PostRecruitPayload, PostRecruitResponse } from '../../api/recruit';
import { AxiosError } from 'axios';

export const POST_RECRUIT = {
  REQUEST: 'RECRUIT_POST_REQUEST',
  SUCCESS: 'RECRUIT_POST_SUCCESS',
  FAILURE: 'RECRUIT_POST_FAILURE',
}

export const postRecruit = 
  createAsyncAction(
    POST_RECRUIT.REQUEST, POST_RECRUIT.SUCCESS, POST_RECRUIT.FAILURE
  )<PostRecruitPayload, PostRecruitResponse, AxiosError>();