import React from 'react';
import styled from 'styled-components';

import palette from 'constants/palette';

const Root = styled.div`
  margin: 5px 0;
`;

const InputForm = styled.input<{ width?: string }>`
  width: ${(props) => (props.width ? props.width : '100%')};
  height: 48px;
  position: relative;

  padding: 16px;
  box-sizing: border-box;
  border: 1px solid ${palette.primaryGradient.toString()};
  border-radius: 4px;
  color: ${palette.greyText.toString()};
  font-size: 16px;
`;

interface Props {
  description: string;
  setValue?: any;
  value?: any;
  type?: string;
  onChange?: any;
  width?: string;
}

const SignupForm = ({ description, setValue, value, type, onChange, width }: Props) => {
  if (!onChange) {
    return (
      <Root>
        <InputForm placeholder={description} type={type} value={value} onChange={(e) => setValue(e.target.value)} />
      </Root>
    );
  } else {
    return (
      <Root>
        <InputForm width={width} placeholder={description} type={type} value={value} onChange={onChange} />
      </Root>
    );
  }
};

export default SignupForm;
