import React, { FC, ReactNode, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { ProposeClubText } from 'components/templates/SimpleText';
import TopClubList from 'components/templates/TopClubList';
import BaseLayout from 'components/templates/BaseLayout';
import ClubList from 'components/templates/ClubList';
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

    const topClubList: ReactNode = match.params.keyword ? null : <TopClubList />

    return (
        <BaseLayout>
            <ProposeClubText />
            {topClubList}
            <ClubList keyword={match.params.keyword} />
        </BaseLayout>
    );
}

export default MainPage;