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

interface Props {

}

const Root: FC<Props> = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={MainPage} />
                <Route path="/search/:keyword" component={MainPage} />
                <Route path="/club/:id" component={ClubDetailPage} />
                <Route path="/register" component={RegisterPage} />
                <Route path="/signup" component={SignupPage} />
                <Route path="/login" component={LoginPage} />
                {/* FilteredPage로 변경 */}
                <Route path="/category/:category" component={FilteredPage} />
                <Route path="/tag/:tag" component={FilteredPage} />
                <Route path="/status/:status" component={FilteredPage} />
                {/* <Route path="/register/club" component={ClubRegisterPage} />
                <Route path="/register/recruit" component={RecruitRegisterPage} /> */}
            </Switch>
        </BrowserRouter>
    );
}


export default Root;