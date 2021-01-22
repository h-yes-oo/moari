import React, { FC, useEffect } from 'react';
import { Route, RouteComponentProps } from "react-router-dom"
import BaseLayout from 'components/templates/BaseLayout';
import RegisterButton from 'components/templates/RegisterButton';
import ClubRegisterPage from '../ClubRegisterPage';
import RecruitRegisterPage from '../RecruitRegisterPage';

interface Props {
}

const RegisterPage: FC<Props & RouteComponentProps> = ({ match }) => {
    return (
        <BaseLayout>
            <RegisterButton />
            {/* <Route exact path={match.path} component={RegisterPage} /> */}
            <Route path={`${match.path}/club`} component={ClubRegisterPage} />
            <Route path={`${match.path}/recruit`} component={RecruitRegisterPage} />
        </BaseLayout>
    );
}

export default RegisterPage;