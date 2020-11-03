import React, { FC } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import MainPage from 'components/pages/MainPage';
import ClubInfoPage from 'components/pages/ClubInfoPage';
import RegisterPage from 'components/pages/RegisterPage';
import ClubRegisterPage from 'components/pages/ClubRegisterPage';
import RecruitRegisterPage from 'components/pages/RecruitRegisterPage';
import SignupPage from 'components/pages/SignupPage';
import LoginPage from 'components/pages/LoginPage';

interface Props {

}

const Root: FC<Props> = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={MainPage} />
                <Route path="/club/:id" component={ClubInfoPage} />
                <Route path="/register" component={RegisterPage} />
                <Route path="/signup" component={SignupPage} />
                <Route path="/login" component={LoginPage} />
                {/* <Route path="/register/club" component={ClubRegisterPage} />
                <Route path="/register/recruit" component={RecruitRegisterPage} /> */}
            </Switch>
        </BrowserRouter>
    );
}


export default Root;