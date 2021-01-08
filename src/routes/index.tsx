import React, { FC } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import MainPage from 'components/pages/MainPage';
import ClubDetailPage from 'components/pages/ClubDetailPage';
import RegisterPage from 'components/pages/RegisterPage';
import ClubRegisterPage from 'components/pages/ClubRegisterPage';
import RecruitRegisterPage from 'components/pages/RecruitRegisterPage';
import SignupPage from 'components/pages/SignupPage';
import LoginPage from 'components/pages/LoginPage';
import FilteredPage from 'components/pages/FilteredPage';
import Auth from '../hoc/auth';

interface Props {

}

const Root: FC<Props> = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Auth(MainPage, null)} />
                <Route path="/search/:keyword" component={Auth(MainPage, null)} />
                <Route path="/club/:id" component={Auth(ClubDetailPage, null)} />
                <Route path="/register" component={Auth(RegisterPage, true)} />
                <Route path="/signup" component={Auth(SignupPage, false)} />
                <Route path="/login" component={Auth(LoginPage, false)} />
                {/* FilteredPage로 변경 */}
                <Route path="/category/:category" component={Auth(FilteredPage, null)} />
                <Route path="/tag/:tag" component={Auth(FilteredPage, null)} />
                <Route path="/status/:status" component={Auth(FilteredPage, null)} />
                {/* <Route path="/register/club" component={ClubRegisterPage} />
                <Route path="/register/recruit" component={RecruitRegisterPage} /> */}
            </Switch>
        </BrowserRouter>
    );
}


export default Root;