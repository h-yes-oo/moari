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
        // 반복되는 부분은 추후 refactoring 예정, 혜수's 과제를 위해 남겨놓음
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
                    type={T.RegisterFormType.TEXT_AREA}
                    height={'600px'}
                />
            </LeftSection>
            <RightSection>
                <RegisterForm 
                    title={text.photo.title}
                    description={text.photo.description}
                    type={T.RegisterFormType.FILE}
                    height={'48px'}
                />
                <RegisterForm 
                    title={text.recruit.title}
                    description={text.recruit.description}
                    type={T.RegisterFormType.SELECT_BOX}
                    height={'48px'}
                />
                <RegisterForm 
                    title={text.category.title}
                    description={text.category.description}
                    type={T.RegisterFormType.SELECT_BOX}
                    height={'48px'}
                />
                <RegisterForm 
                    title={text.tag.title}
                    description={text.tag.description}
                    type={T.RegisterFormType.SELECT_BOX}
                    height={'48px'}
                />
                <RegisterForm 
                    title={text.managerId.title}
                    guide={text.managerId.description}
                    description={"jieun hyesoo"}
                    type={T.RegisterFormType.INPUT}
                    height={'48px'}
                />
            </RightSection>
        </Root>
    );
}

export default ClubRegisterContents;