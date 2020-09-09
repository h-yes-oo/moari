import React, { FC } from 'react';
import styled from 'styled-components';

import { BoldLargeText } from 'constants/styles';

const BoldLargeTextWrapper = styled.div`
    display: flex;
    justify-content: center;
    // transform: translateY(48px);
    margin: 48px 0;
`

interface ProposeClubProps {

}

export const ProposeClubText: FC<ProposeClubProps> = () => {
    return (
        <BoldLargeTextWrapper>
            <BoldLargeText>이런 동아리 어때요 ?</BoldLargeText>
        </BoldLargeTextWrapper>
    )
}