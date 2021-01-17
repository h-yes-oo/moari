import React from 'react';
import styled from 'styled-components';

import loading from 'assets/icons/loading.svg';

const Root = styled.div`
    background-color: #ffffff;
    display: flex;
    height: 70vh;
    justify-content: center;
    align-content: center;
`

const LoadingImage = styled.img`

`

const Loading = () => {
    return (
        <Root>
            <LoadingImage src={loading}/>
        </Root>
    )
}

export default Loading
