import React, { FC } from 'react';
import { ProposeClubText } from 'components/templates/SimpleText';
import ClubList from 'components/templates/ClubList';
import BaseLayout from 'components/templates/BaseLayout';

interface Props {
}

const LandingPage: FC<Props> = () => {
    return (
        <BaseLayout>
            <ProposeClubText />
            <ClubList />
        </BaseLayout>
    );
}

export default LandingPage;