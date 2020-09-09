import React, { FC, ReactNode, useState } from 'react';
import styled, { StyledFunction }from 'styled-components';

import * as T from 'types';
import palette from 'constants/palette';

const Root = styled.div`
    width: 32vw;
    margin: 44px 0;
`

const TextWrapper = styled.div`
    display: flex;
    position: relative;
    margin-bottom: 8px;
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

const InputForm = styled.textarea<{ height: string }>`
    width: 100%;
    height: ${(props) => props.height};
    padding: 16px;
    box-sizing: border-box;
    border: 1px solid ${palette.primaryGradient.toString()};
    border-radius: 4px;
    color: ${palette.greyText.toString()};
    font-size: 16px;
    
    resize: none;
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

const RegisterForm: FC<Props> = ({ title, description, type, height }) => {
    const [value, setValue] = useState<string>(description);

    const startTyping: (e: React.FocusEvent<HTMLTextAreaElement>) => void = (e) => {
        if (e.target.value === description) e.target.value = "";
        
    }

    const leaveInput: (e: React.FocusEvent<HTMLTextAreaElement>) => void = (e) => {
        if (e.target.value === "") e.target.value = description;
    }

    return (
        <Root>
            <TextWrapper>
                <FormTitle>{title}</FormTitle>
                <OptionText>필수 항목</OptionText>
            </TextWrapper>
            <InputForm
                height={height}
                value={value}
                onFocus={(e) => startTyping(e)}
                onBlur={(e) => leaveInput(e)}
                onChange={(e) => setValue(e.target.value)}
            />
        </Root>
    );
}

export default RegisterForm;