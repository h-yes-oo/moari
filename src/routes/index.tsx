import React, { FC } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import MainPage from 'components/pages/MainPage';
import ClubInfoPage from 'components/pages/ClubInfoPage';
import RegisterPage from 'components/pages/RegisterPage';

interface Props {

}

const Root: FC<Props> = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={MainPage} />
                <Route path="/club/:id" component={ClubInfoPage} />
                <Route path="/register/club" component={RegisterPage} />
            </Switch>
        </BrowserRouter>
    );
}


export default Root;