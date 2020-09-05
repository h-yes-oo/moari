import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';

import palette from 'constants/palette';

const Root = styled.div`
    transform: translateY(28px);
    display: flex;
    justify-content: center;
`

const ClubRegisterButton = styled.div`
    width: 300px;
    height: 44px;
    border-radius: 4px 0 0 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${palette.primaryGradient.toString()};

`

const RecruitRegisterButton = styled.div`
    width: 300px;
    height: 44px;
    border-radius: 0 4px 4px 0;
    border: 1px solid ${palette.greyBorder.toString()};
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${palette.primaryGradient.toString()};
`

interface Props {

}

const RegisterButton: FC<Props> = () => {
    return (
        <Root>
            <ClubRegisterButton>동아리 등록하기</ClubRegisterButton>
            <RecruitRegisterButton>모집공고 등록하기</RecruitRegisterButton>
        </Root>
    )
}

export default RegisterButton;