import React from 'react';
import styled from 'styled-components';

import loading from 'assets/icons/loading.svg';

const Root = styled.div`
    background-color: #ffffff;
    display: flex;
    flex: 1;
    justify-content: center;
    align-content: center;
`

const LoadingImage = styled.img`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

const Loading = () => {
    return (
        <Root>
            <LoadingImage src={loading}/>
        </Root>
    )
}

export default Loading
