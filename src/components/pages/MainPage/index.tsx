import React, { FC, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { ProposeClubText } from 'components/templates/SimpleText';
import ClubList from 'components/templates/ClubList';
import BaseLayout from 'components/templates/BaseLayout';
import { match } from 'assert';
import { useDispatch } from 'react-redux';
import { searchClub } from 'actions/club';

interface Props {

}

interface MatchParams {
    keyword: string
}

const MainPage: FC<Props & RouteComponentProps<MatchParams>> = ({ match }) => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(searchClub.request({ keyword: match.params.keyword }));
    }, []);

    return (
        <BaseLayout>
            <ProposeClubText />
            <ClubList keyword={match.params.keyword} />
        </BaseLayout>
    );
}

export default MainPage;