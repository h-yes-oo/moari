import React, { Dispatch, FC, ReactNode, SetStateAction, useState, useMemo } from 'react';
import styled from 'styled-components';

import * as T from 'types';
import palette from 'constants/palette';
import expandArrowSvg from 'assets/icons/expand_more.svg';
import FileUploadSvg from 'assets/icons/upload-photo.svg';

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
    // display: none;
    // width: 100%;
    // height: 48px;
    // padding: 16px;
    // box-sizing: border-box;
    // border: 1px solid ${palette.primaryGradient.toString()};
    // border-radius: 4px;
    // color: ${palette.greyText.toString()};
    // font-size: 16px;
`

const FileButton = styled.img`
    // width: 100%;
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
    setValue?: Dispatch<SetStateAction<any>>;
}

// 여기 말고 아래에 main component 있음 (RegisterForm)
const FormFactory: FC<FormFactoryProps> = ({ type, description, height, options, setValue }) => {
    const [text, setText] = useState<string>(description);

    const handleTextArea: (value: string, setValue: Dispatch<SetStateAction<string>>) => void = (value, setValue) => {
        setText(value);
        setValue(value);
    }

    const handleSendImage: (files: HTMLInputElement["files"], setValue: Dispatch<SetStateAction<FileList>>) => void = (files, setValue) => {
        if (!files) return;
        setValue(files);
    }

    const startTyping: (e: React.FocusEvent<HTMLTextAreaElement>) => void = (e) => {
        if (e.target.value === description) e.target.value = "";
    }

    const leaveInput: (e: React.FocusEvent<HTMLTextAreaElement>) => void = (e) => {
        if (e.target.value === "") e.target.value = description;
    }

    switch (type) {
        case T.RegisterFormType.INPUT:
            if (setValue === undefined) return null;
            return (
                <InputForm placeholder={description} onChange={(e) => setValue(e.target.value)} />
            );
        case T.RegisterFormType.TEXT_AREA:
            if (setValue === undefined) return null;
            return (
                // TODO: useMemo로 최적화할 수 있는 방법
                <TextAreaForm
                    height={height}
                    value={text}
                    onFocus={(e) => startTyping(e)}
                    onBlur={(e) => leaveInput(e)}
                    onChange={(e) => handleTextArea(e.target.value, setValue)}
                />  
            );
        case T.RegisterFormType.FILE:
            if (setValue === undefined) return null;
            return (
                <>
                    <label htmlFor="upload-photo">
                        <FileForm type="file" id="upload-photo" multiple onChange={(e) => handleSendImage(e.target.files, setValue)} />
                        <FileButton src={FileUploadSvg} />
                    </label>
                </>
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
    setValue?: Dispatch<SetStateAction<any>>;
}

const RegisterForm: FC<Props> = ({ title, guide, description, type, height, setValue }) => {
    // const registerForm: ReactNode = <FormFactory type={type} description={description} height={height} onChange={onChange} />

    return (
        <Root>
            <TextWrapper>
                <FormTitle>{title}</FormTitle>
                <OptionText>필수 항목</OptionText>
            </TextWrapper>
            <GuideText>{guide}</GuideText>
            {/* {registerForm} */}
            <FormFactory type={type} description={description} height={height} setValue={setValue} />
        </Root>
    );
}

export default RegisterForm;