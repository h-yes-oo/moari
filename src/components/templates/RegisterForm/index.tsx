import React, { FC, ReactNode, useState } from 'react';
import styled, { StyledFunction }from 'styled-components';

import * as T from 'types';
import palette from 'constants/palette';
import expandArrowSvg from 'assets/icons/expand_more.svg';

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

// height -> CSSProperties prop으로 변경하기
const TextAreaForm = styled.textarea<{ height: string }>`
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
        // outline: none;
    }
`;

const InputForm = styled.input`
    width: 100%;
    height: 48px;
    padding: 16px;
    box-sizing: border-box;
    border: 1px solid ${palette.primaryGradient.toString()};
    border-radius: 4px;
    color: ${palette.greyText.toString()};
    font-size: 16px;
`

const FileForm = styled.input`
    width: 100%;
    height: 48px;
    padding: 16px;
    box-sizing: border-box;
    border: 1px solid ${palette.primaryGradient.toString()};
    border-radius: 4px;
    color: ${palette.greyText.toString()};
    font-size: 16px;
`

const SelectBoxForm = styled.select`
    width: 100%;
    height: 48px;
    padding: 16px;
    box-sizing: border-box;
    border: 1px solid ${palette.primaryGradient.toString()};
    border-radius: 4px;
    color: ${palette.greyText.toString()};
    font-size: 14px;

    -webkit-appearance: none;
    appearance:none;
    background-image: url(${expandArrowSvg});
    background-repeat: no-repeat;
    background-position: top 50% right 2%; 
`

const CalendarForm = styled.input`
    width: 100%;
    height: 48px;
    padding: 16px;
    box-sizing: border-box;
    border: 1px solid ${palette.primaryGradient.toString()};
    border-radius: 4px;
    color: ${palette.greyText.toString()};
    font-size: 16px;
`

const GuideText = styled.div`
    margin: 8px 0;
    color: ${palette.greyText.toString()};
    white-space: pre;
    line-height: 24px;

`

interface FormFactoryProps {
    type: T.RegisterFormType;  
    description: string;
    height: string; 
    options?: string[]; // type should be changed
}

// 여기 말고 아래에 main component 있음 (RegisterForm)
const FormFactory: FC<FormFactoryProps> = ({ type, description, height, options }) => {
    const [value, setValue] = useState<string>(description);

    const startTyping: (e: React.FocusEvent<HTMLTextAreaElement>) => void = (e) => {
        if (e.target.value === description) e.target.value = "";
        
    }

    const leaveInput: (e: React.FocusEvent<HTMLTextAreaElement>) => void = (e) => {
        if (e.target.value === "") e.target.value = description;
    }

    switch (type) {
        case T.RegisterFormType.INPUT:
            return (
                <InputForm />
            );
        case T.RegisterFormType.TEXT_AREA:
            return (
                <TextAreaForm
                    height={height}
                    value={value}
                    onFocus={(e) => startTyping(e)}
                    onBlur={(e) => leaveInput(e)}
                    onChange={(e) => setValue(e.target.value)}
                />  
            );
        case T.RegisterFormType.FILE:
            return (
                <FileForm />
            );
        case T.RegisterFormType.SELECT_BOX:
            // if (!options) return null; 
            return (
                <SelectBoxForm>
                    <option>첫 번째 항목</option>
                    <option>두 번째 항목</option>
                    <option>세 번째 항목</option>
                </SelectBoxForm>
            )
        case T.RegisterFormType.CALENDAR:
            return (
                <CalendarForm />
            );        
        default:
            return null;
    }
};

interface Props {
    title: string;
    guide?: string;
    description: string;
    type: T.RegisterFormType;  
    height: string; 
}

const RegisterForm: FC<Props> = ({ title, guide, description, type, height }) => {
    const registerForm: ReactNode = <FormFactory type={type} description={description} height={height} />

    return (
        <Root>
            <TextWrapper>
                <FormTitle>{title}</FormTitle>
                <OptionText>필수 항목</OptionText>
            </TextWrapper>
            <GuideText>{guide}</GuideText>
            {registerForm}
        </Root>
    );
}

export default RegisterForm;