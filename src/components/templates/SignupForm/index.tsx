import React, { Dispatch, FC, SetStateAction} from 'react';
import styled from 'styled-components';

import * as T from 'types';
import palette from 'constants/palette';

const Root = styled.div`
    margin: 5px 0;
`
const InputForm = styled.input<{ width?: string }>`
    width: ${(props) => props.width ? props.width : '100%'};
    height: 48px;
    position: relative;

    padding: 16px;
    box-sizing: border-box;
    border: 1px solid ${palette.primaryGradient.toString()};
    border-radius: 4px;
    color: ${palette.greyText.toString()};
    font-size: 16px;
`


// interface FormFactoryProps {
//     type: T.LoginFormType;  
//     description: string;
//     height: string; 
//     options?: string[]; // type should be changed
//     setValue?: Dispatch<SetStateAction<any>>;
//     initialValue?: string;
//     value?: any;
// }

// const FormFactory: FC<FormFactoryProps> = ({ type, description, height, options, setValue, initialValue, value }) => {

//     switch (type) {
//         case T.LoginFormType.INPUT:
//             if (setValue === undefined) return null;
//             return (
//                 <InputForm placeholder={description} value={value} onChange={(e) => setValue(e.target.value)}/>
//             );
//         case T.LoginFormType.PASSWORD:
//             if (setValue === undefined) return null;
//             return (
//                 <InputForm placeholder={description} onChange={(e) => setValue(e.target.value)} type="password"/>
//             );
//         default:
//             return null;
//     }
// };

interface InputFormProps {
    description: string;
    setValue?: any;
    value?: any;
    type?: string;
    onChange? : any;
    width? : string;
}

const SignupForm: FC<InputFormProps> = ({ description, setValue, value, type, onChange, width }) => {
    if(onChange === undefined) {
        return (
            <Root>
                <InputForm placeholder={description} type={type} value={value} onChange={(e) => setValue(e.target.value)}/>
            </Root>
        ) 
    } else {
        return (
            <Root>
                <InputForm width={width} placeholder={description} type={type} value={value} onChange={onChange}/>
            </Root>
        )
    }
}

export default SignupForm;