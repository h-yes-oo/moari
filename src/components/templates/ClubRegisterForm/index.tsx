import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';
import RegisterInputForm from '../RegisterFormInput';
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

const ClubRegisterForm: FC<Props> = () => {
    return (
        <Root>
            <LeftSection>
                <RegisterInputForm
                    title={text.clubName.title}
                    description={text.clubName.description}
                    type={T.RegisterFormType.INPUT}
                    height={'48px'}
                />
                <RegisterInputForm
                    title={text.clubInfo.title}
                    description={text.clubInfo.description}
                    type={T.RegisterFormType.INPUT}
                    height={'100px'}
                />
                <RegisterInputForm 
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

export default ClubRegisterForm;