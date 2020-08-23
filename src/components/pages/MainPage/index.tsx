import React, { FC } from 'react';
import Header from 'components/templates/Header';
import TopMenuBar from 'components/templates/TopMenuBar';
import { ProposeClubText } from 'components/templates/SimpleText';
import ClubList from 'components/templates/ClubList';

interface Props {
}

const LandingPage: FC<Props> = () => {
    return (
        <>
            <Header campusName='SNU' username='송지은' />
            <TopMenuBar />
            <ProposeClubText />
            <ClubList />
        </>
    );
}

export default LandingPage;