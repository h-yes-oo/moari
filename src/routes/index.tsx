import React, { FC } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import MainPage from 'components/pages/MainPage';
import ClubDetailPage from 'components/pages/ClubDetailPage';
import RegisterPage from 'components/pages/RegisterPage';
import SignupPage from 'components/pages/SignupPage';
import LoginPage from 'components/pages/LoginPage';
import FilteredPage from 'components/pages/FilteredPage';
import AuthWithBaseLayout from '../hoc/authWithBaseLayout';

interface Props {}

const Root: FC<Props> = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={AuthWithBaseLayout(MainPage, null)} />
        <Route path="/search/:keyword" component={AuthWithBaseLayout(MainPage, null)} />
        <Route exact path="/club/:id" component={AuthWithBaseLayout(ClubDetailPage, null)} />
        <Route path="/club/:id/:tab" component={AuthWithBaseLayout(ClubDetailPage, null)} />
        <Route path="/register" component={AuthWithBaseLayout(RegisterPage, true)} />
        <Route path="/signup" component={AuthWithBaseLayout(SignupPage, false)} />
        <Route path="/login" component={AuthWithBaseLayout(LoginPage, false)} />
        <Route path="/category/:category" component={AuthWithBaseLayout(FilteredPage, null)} />
        <Route path="/tag/:tag" component={AuthWithBaseLayout(FilteredPage, null)} />
        <Route path="/status/:status" component={AuthWithBaseLayout(FilteredPage, null)} />
      </Switch>
    </BrowserRouter>
  );
};

export default Root;
