import React, { FC } from 'react';
import styled from 'styled-components';
import RecruitRegisterContents from 'components/templates/RecruitRegisterContents';

const Root = styled.div`
    padding: 52px 208px;
`
interface Props {

}

const RecruitRegisterPage: FC<Props> = () => {
    return (
        <Root>
            <RecruitRegisterContents />
        </Root>
    );
}

export default RecruitRegisterPage;