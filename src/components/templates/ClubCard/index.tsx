import React, { FC } from 'react';
import styled from 'styled-components';

const Root = styled.div`
    width: 358px;
    height: 512px;
    border-radius: 20px;
    background-color: #EEEEEE;
` 

interface Props {
    name?: string;
    description?: string;
    status?: any // type 정의 필요: 모집 준비 중, 상시 모집, 모집 중, 모집 마감
    image?: File;
}

const ClubCard: FC<Props> = () => {
    return (
        <Root>
            
        </Root>
    );
}

export default ClubCard;