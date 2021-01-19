import React, { Dispatch, FC, ReactNode, SetStateAction, useEffect, useState } from 'react';
import styled from 'styled-components';
import Select from 'react-select'

import * as T from 'types';
import palette from 'constants/palette';
import expandArrowSvg from 'assets/icons/expand_more.svg';
import fileUploadSvg from 'assets/icons/upload-photo.svg';
import personIcon from 'assets/icons/person-icon.svg';
import plusIcon from 'assets/icons/id-add.svg';
import removeIcon from 'assets/icons/id-remove.svg';
import pencilIcon from 'assets/icons/form-pencil.svg';
import calendarIcon from 'assets/icons/form-calendar.svg';

const Root = styled.div`
    width: 32vw;
    margin: 44px 0;
`

const FlexContainer = styled.div<{ type?: string}>`
    display: flex;
    position: relative;
    align-items: center;
    justify-content: space-between;
    margin: ${(props) => props.type === "addableInput" ? '4px 0' : ''};
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

const OptionText = styled.div<{ required: boolean, highlight?: boolean }>`
    display: ${(props) => props.required ? '' : 'none'};
    color: ${(props) => props.highlight ? palette.primaryViolet.toString() : palette.greyNumber.toString()};
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

const InputForm = styled.input<{ addable?: boolean }>`
    width: 100%;
    height: 48px;
    position: relative;

    padding: 16px;
    padding-left: ${(props) => props.addable ? '56px' : 'none'};
    box-sizing: border-box;
    border: 1px solid ${palette.primaryGradient.toString()};
    border-radius: 4px;
    color: ${palette.greyText.toString()};
    font-size: 16px;
`

const InputIcon = styled.img<{ type: string }>`
    position: absolute;
    width: ${(props) => props.type === 'leading' ? '20px' : '28px'};
    height: auto;

    left: ${(props) => props.type === 'leading' ? '18px' : 'none'};
    right: ${(props) => props.type === 'trailing' ? '18px' : props.type === 'minus' ? '52px' : 'none'};
    cursor: ${(props) => props.type === 'leading' ? '' : 'pointer'};
`

const FileForm = styled.input`
    display: none;   
`

const FileInput = styled.input`
    width: 100%;
    height: 48px;
    padding: 16px;
    box-sizing: border-box;
    border: 1px solid ${palette.primaryGradient.toString()};
    border-radius: 4px;
    color: ${palette.greyText.toString()};
    font-size: 16px;
`

const FileButton = styled.img`
`   

const SelectBoxContainer = styled.select`
    // display: none;
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
    width: 49%; // 수정 필요
    height: 48px;
    padding: 16px;
    box-sizing: border-box;
    border: 1px solid ${palette.primaryGradient.toString()};
    border-radius: 4px;
    color: ${palette.greyText.toString()};
    font-size: 16px;
    &:before {
        content: attr(placeholder) !important;
    }
    &::-webkit-datetime-edit,
    &::-webkit-datetime-edit-year-field,
    &::-webkit-datetime-edit-text {
        color: transparent;
    }
`

const GuideText = styled.div`
    margin: 8px 0;
    color: ${palette.greyText.toString()};
    white-space: pre;
    line-height: 24px;
`

interface FormFactoryProps {
    type: T.RegisterFormType;  
    description: string | string[];
    height: string; 
    options?: string[]; // type should be changed
    setValue?: Dispatch<SetStateAction<any>> | ((e: any) => void);
}

// 여기 말고 아래에 main component 있음 (RegisterForm)
const FormFactory: FC<FormFactoryProps> = ({ type, description, height, options, setValue }) => {
    const [text, setText] = useState<string | string[]>(description);
    const [selectedFiles, setSelectedFiles] = useState<FileList>();
    const [currInput, setCurrInput] = useState<string>("");
    const [currManagerIds, setCurrManagerIds] = useState<string[]>([]);
    const [currDuration, setCurrDuration] = useState<string[]>([]);

    useEffect(() => {
        console.log(currDuration);
    }, [currDuration])

    const handleTextArea: (value: string, setValue: Dispatch<SetStateAction<string>>) => void = (value, setValue) => {
        setText(value);
        setValue(value);
    }

    const handleSelectImage: (files: HTMLInputElement["files"], setValue: Dispatch<SetStateAction<FileList>>) => void = (files, setValue) => {
        if (!files) return;
        setValue(files);
        setSelectedFiles(files);
    }

    const startTyping: (e: React.FocusEvent<HTMLTextAreaElement>) => void = (e) => {
        if (e.target.value === description) e.target.value = "";
    }

    const leaveInput: (e: React.FocusEvent<HTMLTextAreaElement>) => void = (e) => {
        if (e.target.value === "") e.target.value = description as string;
    }

    switch (type) {
        case T.RegisterFormType.INPUT:
            if (setValue === undefined) return null;
            return (
                <FlexContainer>
                    <InputForm placeholder={description as string} onChange={(e) => setValue(e.target.value)} />
                </FlexContainer>
            );
        case T.RegisterFormType.INPUT_ADDABLE:
            if (setValue === undefined) return null;
            const addInput: () => void = () => {
                setCurrManagerIds([...currManagerIds, currInput]);
                setValue([...currManagerIds, currInput]);
            }

            const removeInput: (id: string) => void = (id) => {
                setCurrManagerIds([...currManagerIds.filter((managerId) => managerId !== id)]);
                setValue([...currManagerIds.filter((managerId) => managerId !== id)]);
            }

            const handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void = (e) => {            
                setCurrInput(e.target.value);               
            }

            const managerIdInput: ReactNode = (
                <>
                    <FlexContainer>
                        {/* TODO: onChange event throttling */}
                        <InputForm addable={true} onChange={(e) => handleInput(e)} />
                        <InputIcon src={personIcon} type={'leading'} />
                        <InputIcon src={plusIcon} type={'trailing'} onClick={() => addInput()} />
                    </FlexContainer>
                    <hr style={{ border: `1px solid ${palette.primaryGradient.toString()}` }}/>
                </>
            );

            return (
                <>
                    {managerIdInput}
                    { currManagerIds.map((managerId) => (
                        <FlexContainer type={"addableInput"} key={managerId}>
                            <InputForm addable={true} placeholder={managerId} disabled={true} />
                            <InputIcon src={personIcon} type={'person'} />
                            <InputIcon src={plusIcon} type={'plus'} onClick={() => addInput()} />
                            <InputIcon src={removeIcon} type={'minus'} onClick={() => removeInput(managerId)} />
                        </FlexContainer>
                    ))}
                </>
            )
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
            const selectedFileInfo = selectedFiles ? selectedFiles[0].name : "선택된 파일이 없습니다."  
            return (
                <FlexContainer>
                    <FileInput placeholder={selectedFileInfo} />
                    <label htmlFor="upload-photo" style={{ "display": "flex" }}>
                        <FileForm id="upload-photo" type="file" multiple onChange={(e) => handleSelectImage(e.target.files, setValue)} />
                        <FileButton src={fileUploadSvg} />
                    </label>
                </FlexContainer>
            );
        case T.RegisterFormType.SELECT_BOX:
            if (!options) return null; 
            if (setValue === undefined) return null;

            const selectOptions = options.map(option => {
                return {
                    value: option,
                    label: option,
                }              
            })

            const selectChange: (e: any) => void = (e) => {
                setValue(e.value);
            }

            const customStyles = {
                valueContainer: (provided: any, state: { isSelected: any; }) => ({
                    ...provided,
                    // display: 'none',
                    width: '100%',
                    height: '48px',
                    padding: '16px',
                    boxSizing: 'border-box',
                    border: `1px solid ${palette.primaryGradient.toString()}`,
                    borderRadius: '4px',
                    color: palette.greyText.toString(),
                    fontSize: '14px',
                    backgroundImage:`url(${expandArrowSvg})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'top 50% right 2%',
                }),
                
                dropdownIndicator: (provided: any, state: { isSelected: any; }) => ({
                    ...provided,
                    display: 'none',                   
                }),

                option: (provided: any, state: { isSelected: any; isFocused: any; }) => ({
                    ...provided,
                    color: state.isSelected || state.isFocused ? '#ffffff' : palette.greyText.toString(),
                    backgroundColor: state.isSelected || state.isFocused ? palette.primaryGradient.toString() : '#ffffff',
                    padding: 20,
                    width: '100%',
                    height: '48px',
                    boxSizing: 'border-box',
                    border: `1px solid ${palette.primaryGradient.toString()}`,
                    borderRadius: '4px',
                    fontSize: '14px',
                }),

                // singleValue: (provided: any, state: { isDisabled: any; }) => {
                //   const opacity = state.isDisabled ? 0.5 : 1;
                //   const transition = 'opacity 300ms';
                //   return { ...provided, opacity, transition };
                // }
            }

            return (
                <Select
                    styles={customStyles}
                    options={selectOptions}
                    onChange={(e) => selectChange(e)}
                    placeholder={description}
                />
            )
        case T.RegisterFormType.CALENDAR:
            return (
                <FlexContainer>
                    <CalendarForm 
                        type='date' 
                        placeholder={currDuration[0] ? currDuration[0] : description[0]} 
                        onChange={(e) => setCurrDuration([e.target.value, currDuration[1]])} 
                    />
                    <CalendarForm 
                        type='date' 
                        placeholder={currDuration[1] ? currDuration[1] : description[1]} 
                        onChange={(e) => setCurrDuration([currDuration[0], e.target.value])} 
                    />
                </FlexContainer>
            );        
        default:
            return null;
    }
};

interface Props {
    title: string;
    guide?: string;
    description: string | string[];
    type: T.RegisterFormType;  
    options?: string[];
    height: string; 
    required: boolean;
    highlight?: boolean;
    setValue?: Dispatch<SetStateAction<any>>;
}

const RegisterForm: FC<Props> = ({ title, guide, description, type, options, height, required, highlight, setValue }) => {
    return (
        <Root>
            <TextWrapper>
                <FormTitle>{title}</FormTitle>
                <OptionText required={required} highlight={highlight} >필수 항목</OptionText>
            </TextWrapper>
            <GuideText>{guide}</GuideText>
            <FormFactory type={type} description={description} height={height} options={options} setValue={setValue} />
        </Root>
    );
}

export default RegisterForm;