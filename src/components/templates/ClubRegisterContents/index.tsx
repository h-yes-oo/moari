import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';
import RegisterForm from '../RegisterForm';
import * as T from 'types';
import text from './text';

const Root = styled.div`
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
                    type={T.RegisterFormType.INPUT}
                    height={'48px'}
                />
                <RegisterForm
                    title={text.clubInfo.title}
                    description={text.clubInfo.description}
                    type={T.RegisterFormType.INPUT}
                    height={'100px'}
                />
                <RegisterForm 
                    title={text.clubDetail.title}
                    description={text.clubDetail.description}
                    type={T.RegisterFormType.INPUT}
                    height={'600px'}
                />
            </LeftSection>
            <RightSection>

            </RightSection>
        </Root>
    );
}

export default ClubRegisterContents;