import React, { FC, useState, useEffect } from 'react';
import BaseLayout from 'components/templates/BaseLayout';
import styled from 'styled-components';
import LoginForm from '../../templates/LoginForm';
import text from './text';
import * as T from 'types';
import signUpButtonSvg from 'assets/icons/signup-button.svg';
import logo from 'assets/icons/logo.svg';
import moariSignUp from 'assets/icons/moari-signup.svg';
import duplicateCheckSvg from 'assets/icons/duplicate-check.svg';
import palette from 'constants/palette';

const Root = styled.div`
    display: flex;
    justify-content: center;
`

const Wrapper = styled.div`
    padding: 100px;
    display: flex;
    flex-direction: column;
    align-content: center;
`

const RegisterButton = styled.img`
    margin-top: 10px;
    &:hover {
        cursor: pointer;
    }
`
const Logo = styled.img`

`

const Title =styled.img`

`

const TopWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 5px 0px;
`


const NickNameWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const DuplicateButton = styled.img`
    margin-left : 10px;
    &:hover {
        cursor: pointer;
    }
`
const Agreement = styled.textarea`
    border: ${palette.greyText.toString()};
    color: ${palette.greyText.toString()};
    height: 200px;
`

const Label = styled.label`
    display:flex;
    justify-content: flex-start;
    align-items: center;
    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    text-align: center;
    color: rgba(31, 32, 65, 0.5);
`

const CheckBox = styled.input`
    border: 1px solid rgba(31, 32, 65, 0.5);
    border-radius: 2px;
    margin-left: 0px;
    margin-top: 0px;
    margin-bottom: 0px;
    margin-right: 5px;
    transform : scale(1.2);
    padding: 0px;
`

interface Props {
}

const SignupPage: FC<Props> = () => {
    const [Id,setId] = useState<string>('');
    const [Password,setPassword] = useState<string>('');
    const [Email,setEmail] = useState<string>('');
    const [Nickname,setNickname] = useState<string>('');
    const [ConfirmPassword,setConfirmPassword] = useState<string>('');
    

    const handleSignup: () => void = () => {
        //TODO
    }

    const duplicateCheck: () => void = () => {
        //TODO
    }

    const AgreementText = text.agreement.text;

    return (
        <BaseLayout>
            <Root>
                <Wrapper>
                    <TopWrapper>
                        <Logo src={logo} />
                        <Title src={moariSignUp}/>
                    </TopWrapper>
                    <LoginForm
                        description={text.loginId.description}
                        type={T.RegisterFormType.INPUT}
                        height={'60px'}
                        setValue={setId}
                    />
                    <LoginForm
                        description={text.email.description}
                        type={T.RegisterFormType.INPUT}
                        height={'60px'}
                        setValue={setEmail}
                    />
                    <NickNameWrapper>
                        <LoginForm
                            description={text.nickname.description}
                            type={T.RegisterFormType.INPUT}
                            height={'60px'}
                            setValue={setNickname}
                        />
                        <DuplicateButton src={duplicateCheckSvg} onClick={() => duplicateCheck()} />
                    </NickNameWrapper>
                    {/* RegisterFormType 지은이한테 물어보기*/}
                    <LoginForm
                        description={text.password.description}
                        type={T.RegisterFormType.TEXT_AREA}
                        height={'60px'}
                        setValue={setPassword}
                    />
                    <LoginForm
                        description={text.confirmPassword.description}
                        type={T.RegisterFormType.TEXT_AREA}
                        height={'60px'}
                        setValue={setConfirmPassword}
                    />
                    <Agreement value={AgreementText}></Agreement>
                    <Label><CheckBox type="checkbox" name="maintainLogin" value="maintain"/> 약관 동의</Label>
                    <RegisterButton src={signUpButtonSvg} onClick={() => handleSignup()} />
                </Wrapper>
            </Root>
        </BaseLayout>
    );
}

export default SignupPage;