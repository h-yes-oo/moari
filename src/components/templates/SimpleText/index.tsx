import React, { FC } from 'react';
import styled from 'styled-components';

const BoldTextWrapper = styled.div`
    display: flex;
    justify-content: center;
    // transform: translateY(48px);
    margin: 48px 0;
`

const BoldText = styled.div`
    font-size: 28px;
    font-weight: bold;
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