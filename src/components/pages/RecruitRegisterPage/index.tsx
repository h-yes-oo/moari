import React from 'react';
import styled from 'styled-components';

import RecruitRegisterContents from 'components/templates/RecruitRegisterContents';

const Root = styled.div`
  padding: 52px 208px;
`;

const RecruitRegisterPage = () => {
  return (
    <Root>
      <RecruitRegisterContents />
    </Root>
  );
};

export default RecruitRegisterPage;
