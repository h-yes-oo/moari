import React, { FC, ReactNode } from 'react';
import styled, { StyledFunction }from 'styled-components';

import * as T from 'types';
import palette from 'constants/palette';

const Root = styled.div`
    width: 480px;
    margin: 8px 0;
`

const TextWrapper = styled.div`
    display: flex;
    position: relative;
    margin-bottom: 4px;
`

const FormTitle = styled.div`
    font-size: 20px;
    font-weight: bold;
`

const OptionText = styled.div`
    color: ${palette.greyNumber.toString()};
    position: absolute;
    right: 0;
`

const InputForm = styled.input<{ height: string }>`
    width: 100%;
    height: ${(props) => props.height};
    border: 1px solid ${palette.primaryGradient.toString()};
    border-radius: 4px;
    color: ${palette.greyText.toString()};
    font-size: 16px;
    &:focus {
        outline: none;
    }
`;

// const FormSelection:
// const FileForm:
// const CalendarForm:

interface Props {
    title: string;
    description: string;
    type: T.RegisterFormType;   
    height: string; 
}

const RegisterFormInput: FC<Props> = ({ title, description, type, height }) => {
    return (
        <Root>
            <TextWrapper>
                <FormTitle>{title}</FormTitle>
                <OptionText>필수 항목</OptionText>
            </TextWrapper>
            <InputForm height={height} placeholder={description} />
        </Root>
    );
}

export default RegisterFormInput;