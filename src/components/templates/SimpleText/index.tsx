import React, { FC } from 'react';
import styled from 'styled-components';

import { BoldText } from 'constants/styles';

const BoldTextWrapper = styled.div`
    display: flex;
    justify-content: center;
    // transform: translateY(48px);
    margin: 48px 0;
`

interface ProposeClubProps {

}

export const ProposeClubText: FC<ProposeClubProps> = () => {
    return (
        <BoldTextWrapper>
            <BoldText>이런 동아리 어때요 ?</BoldText>
        </BoldTextWrapper>
    )
}