import React, { FC } from 'react';
<<<<<<< HEAD
import Header from 'components/templates/Header';
import TopMenuBar from 'components/templates/TopMenuBar';
import { ProposeClubText } from 'components/templates/SimpleText';
import ClubList from 'components/templates/ClubList';
=======
import { ProposeClubText } from 'components/templates/SimpleText';
import ClubList from 'components/templates/ClubList';
import BaseLayout from 'components/templates/BaseLayout';
>>>>>>> 05f8d9fc71c3cf0b0dca6901a732ec35404472e5

interface Props {
}

const LandingPage: FC<Props> = () => {
    return (
<<<<<<< HEAD
        <>
            <Header campusName='SNU' username='송지은' />
            <TopMenuBar />
            <ProposeClubText />
            <ClubList />
        </>
=======
        <BaseLayout>
            <ProposeClubText />
            <ClubList />
        </BaseLayout>
>>>>>>> 05f8d9fc71c3cf0b0dca6901a732ec35404472e5
    );
}

export default LandingPage;