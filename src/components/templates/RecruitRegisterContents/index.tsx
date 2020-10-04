import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';
import RegisterForm from '../RegisterForm';
import * as T from 'types';
import text from './text';

const Root = styled.div`
    display: flex;
    justify-content: space-between;
`

const LeftSection = styled.div`

`

const RightSection = styled.div`

`

interface Props {

}

const ClubRegisterContents: FC<Props> = () => {
    return (
        <Root>
            <LeftSection>
                <RegisterForm
                    title={text.clubName.title}
                    description={text.clubName.description}
                    type={T.RegisterFormType.SELECT_BOX}
                    height={'48px'}
                />
                <RegisterForm
                    title={text.recruitTitle.title}
                    description={text.recruitTitle.description}
                    type={T.RegisterFormType.INPUT}
                    height={'100px'}
                />
                <RegisterForm 
                    title={text.recruitPeriod.title}
                    description={text.recruitPeriod.description1}
                    type={T.RegisterFormType.INPUT}
                    height={'600px'}
                />
            </LeftSection>
            <RightSection>
                <RegisterForm 
                    title={text.recruitDetails.title}
                    description={text.recruitDetails.description}
                    type={T.RegisterFormType.TEXT_AREA}
                    height={'600px'}
                />
            </RightSection>
        </Root>
    );
}

export default ClubRegisterContents;