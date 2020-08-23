import React, { FC } from 'react';
import styled from 'styled-components';

import * as T from 'types';

const Root = styled.div`
    width: 358px;
    height: 512px;
    border-radius: 20px;
    background-color: #EEEEEE;
` 

interface Props {
    name?: string;
    description?: string;
    image?: string; // need change
    status?: T.ClubStatus
    tags?: Array<string>; // types에 tag 정의
}

const ClubCard: FC<Props> = () => {
    return (
        <Root>
        
        </Root>
    );
}

export default ClubCard;