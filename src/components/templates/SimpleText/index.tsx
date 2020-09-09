import React, { FC } from 'react';
import styled from 'styled-components';

<<<<<<< HEAD
const BoldTextWrapper = styled.div`
=======
import { BoldLargeText } from 'constants/styles';

const BoldLargeTextWrapper = styled.div`
>>>>>>> 05f8d9fc71c3cf0b0dca6901a732ec35404472e5
    display: flex;
    justify-content: center;
    // transform: translateY(48px);
    margin: 48px 0;
`

<<<<<<< HEAD
const BoldText = styled.div`
    font-size: 28px;
    font-weight: bold;
`

=======
>>>>>>> 05f8d9fc71c3cf0b0dca6901a732ec35404472e5
interface ProposeClubProps {

}

export const ProposeClubText: FC<ProposeClubProps> = () => {
    return (
<<<<<<< HEAD
        <BoldTextWrapper>
            <BoldText>이런 동아리 어때요 ?</BoldText>
        </BoldTextWrapper>
=======
        <BoldLargeTextWrapper>
            <BoldLargeText>이런 동아리 어때요 ?</BoldLargeText>
        </BoldLargeTextWrapper>
>>>>>>> 05f8d9fc71c3cf0b0dca6901a732ec35404472e5
    )
}