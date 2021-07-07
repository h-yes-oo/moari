import React, { ReactNode } from 'react';
import styled from 'styled-components';

import Header from '../Header';
import TopMenuBar from '../TopMenuBar';
import Footer from '../Footer';
import { AuthResponse } from 'api/auth';

const Root = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const ContentsWrapper = styled.div`
  position: relative;
  margin-top: 208px;
  flex: 1;
`;

interface Props {
  children: ReactNode;
  user: AuthResponse;
}

const BaseLayout = ({ children, user }: Props) => {
  return (
    <Root>
      <Header campusName={'SNU'} user={user} />
      <TopMenuBar />
      <ContentsWrapper>{children}</ContentsWrapper>
      <Footer />
    </Root>
  );
};

export default BaseLayout;
