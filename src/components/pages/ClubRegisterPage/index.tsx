import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';
import ClubRegisterForm from 'components/templates/ClubRegisterForm';

const Root = styled.div`
    // display: flex;
`
const GuideText = styled.div`
    font-size: 24px;
    font-weight: bold;
    line-height: 48px;
`

interface Props {

}


const ClubRegisterPage: FC<Props> = () => {
    return (
        <Root>
            <GuideText>
                새로운 동아리를 등록합니다<br />
                이미 등록되어 있는지 다시 한번 확인해주세요 
            </GuideText>
            <ClubRegisterForm />
        </Root>
    );
}

export default ClubRegisterPage;