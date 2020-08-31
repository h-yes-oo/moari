/* sub-router for club */
import React, { FC } from 'react';
import { Switch, Route, RouteComponentProps, withRouter } from "react-router-dom"
  
interface Props {

}

const ClubRouter: FC<Props> = () => {  
    return (
        <Switch>
            {/* <Route path={`${match.url}/:id/info`} component={ClubInfo} />
            <Route path={`${match.url}/:id/story`} component={ClubStory} />
            <Route path={`${match.url}/:id/qna`} component={ClubQnA} /> */}
        </Switch>
    );
}
  
  export default withRouter(ClubRouter);