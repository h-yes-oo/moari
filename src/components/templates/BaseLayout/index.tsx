import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';
import Header from '../Header';
import TopMenuBar from '../TopMenuBar';
import Footer from '../Footer';

const Root = styled.div`
    width: 100%;
`

const ContentsWrapper = styled.div`
    position: relative;
    margin-top: 208px;
`

interface LayoutProps {
    children: ReactNode;
}

const BaseLayout: FC<LayoutProps> = ({ children }) => {
    return (
        <Root>
            <Header campusName={'SNU'} username={'zig'} />
            <TopMenuBar />
                <ContentsWrapper>
                    {children}
                </ContentsWrapper>
            <Footer />
        </Root>
    );
}

export default BaseLayout;