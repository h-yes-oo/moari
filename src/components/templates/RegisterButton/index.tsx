import React from 'react';
import styled from 'styled-components';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import * as T from 'types';
import palette from 'constants/palette';

const Root = styled.div`
  transform: translateY(28 px);
  display: flex;
  justify-content: center;
`;

interface ButtonProps {
  buttonType: T.RegisterButton;
  isSelected: boolean;
}

const Button = styled.div<ButtonProps>(({ buttonType, isSelected }) => ({
  width: '300px',
  height: '44px',
  fontWeight: 'bold',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  boxSizing: 'border-box',
  cursor: 'pointer',

  borderRadius: buttonType === T.RegisterButton.CLUB_REGISTER ? '4px 0 0 4px' : '0 4px 4px 0',

  color: isSelected ? '#ffffff' : palette.primaryGradient.toString(),
  backgroundColor: isSelected ? palette.primaryGradient.toString() : '',
  border: isSelected ? '' : `1px solid ${palette.greyBorder.toString()}`,
}));

const RegisterButton = ({ history }: RouteComponentProps) => {
  const isClubSelected: boolean = history.location.pathname.includes('club');

  const showRegisterForm: (buttonType: T.RegisterButton) => void = (buttonType) => {
    buttonType === T.RegisterButton.CLUB_REGISTER ? history.push('/register/club') : history.push('/register/recruit');
  };

  return (
    <Root>
      <Button
        buttonType={T.RegisterButton.CLUB_REGISTER}
        isSelected={isClubSelected}
        onClick={() => showRegisterForm(T.RegisterButton.CLUB_REGISTER)}
      >
        동아리 등록하기
      </Button>
      <Button
        buttonType={T.RegisterButton.RECRUIT_REGISTER}
        isSelected={!isClubSelected}
        onClick={() => showRegisterForm(T.RegisterButton.RECRUIT_REGISTER)}
      >
        모집공고 등록하기
      </Button>
    </Root>
  );
};

export default withRouter(RegisterButton);
