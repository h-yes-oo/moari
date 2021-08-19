import React from 'react';
import styled from 'styled-components';

import { BoldLargeText } from 'constants/styles';

const BoldLargeTextWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 48px 0;
`;

export const ProposeClubText = () => {
  return (
    <BoldLargeTextWrapper>
      <BoldLargeText>이런 동아리 어때요 ?</BoldLargeText>
    </BoldLargeTextWrapper>
  );
};
