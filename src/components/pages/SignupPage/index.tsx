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
import { useDispatch } from 'react-redux';
import { signupUser } from 'actions/signup';
import { RouteComponentProps, withRouter, useHistory } from 'react-router-dom';

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

const SignupPage: FC<Props & RouteComponentProps> = ({ history }) => {
    const [id,setId] = useState<string>('');
    const [password,setPassword] = useState<string>('');
    const [email,setEmail] = useState<string>('');
    const [name,setNickname] = useState<string>('');
    const [confirmPassword,setConfirmPassword] = useState<string>('');
    const [agreement,setAgreement] = useState<boolean>(false);
    
    const dispatch = useDispatch();

    const handleSignup: () => void = () => {
        console.log("handleSignup");
        if(agreement === false) {
            alert("약관에 동의해주세요");
            return;
        }
        if(password !== confirmPassword){
            alert("비밀번호가 같지 않습니다");
            return;
        }
        dispatch(signupUser.request({id,password,email,name, history}));
    }

    const duplicateCheck: () => void = () => {
        //TODO
    }

    const agreementText = text.agreement.text;

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
                        type={T.LoginFormType.INPUT}
                        height={'60px'}
                        setValue={setId}
                    />
                    <LoginForm
                        description={text.email.description}
                        type={T.LoginFormType.INPUT}
                        height={'60px'}
                        setValue={setEmail}
                    />
                    <NickNameWrapper>
                        <LoginForm
                            description={text.nickname.description}
                            type={T.LoginFormType.INPUT}
                            height={'60px'}
                            setValue={setNickname}
                        />
                        <DuplicateButton src={duplicateCheckSvg} onClick={() => duplicateCheck()} />
                    </NickNameWrapper>
                    <LoginForm
                        description={text.password.description}
                        type={T.LoginFormType.PASSWORD}
                        height={'60px'}
                        setValue={setPassword}
                    />
                    <LoginForm
                        description={text.confirmPassword.description}
                        type={T.LoginFormType.PASSWORD}
                        height={'60px'}
                        setValue={setConfirmPassword}
                    />
                    <Agreement value={agreementText} readOnly disabled></Agreement>
                    <Label><CheckBox type="checkbox" name="maintainLogin" checked={agreement} onClick={()=>{setAgreement(!agreement);}}/> 약관 동의</Label>
                    <RegisterButton src={signUpButtonSvg} onClick={() => handleSignup()} />
                </Wrapper>
            </Root>
        </BaseLayout>
    );
}

export default withRouter(SignupPage);