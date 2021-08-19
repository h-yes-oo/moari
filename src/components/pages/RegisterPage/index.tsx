import React from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';

import { AuthResponse } from 'api/auth';
import ClubRegisterPage from '../ClubRegisterPage';
import RecruitRegisterPage from '../RecruitRegisterPage';
import RegisterButton from 'components/templates/RegisterButton';

interface Props {
  user: AuthResponse;
}

const RegisterPage = ({ match, user }: Props & RouteComponentProps) => {
  return (
    <>
      <RegisterButton />
      <Route path={`${match.path}/club`} component={ClubRegisterPage} />
      <Route path={`${match.path}/recruit`} component={RecruitRegisterPage} />
    </>
  );
};

export default RegisterPage;
