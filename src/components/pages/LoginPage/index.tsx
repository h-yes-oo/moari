import React, { FC, useState } from 'react';
import BaseLayout from 'components/templates/BaseLayout';
import styled from 'styled-components';
import LoginForm from '../../templates/LoginForm';
import text from './text';
import * as T from 'types';
import loginButtonSvg from 'assets/icons/login-button.svg';
import logo from 'assets/icons/logo.svg';
import moariLogin from 'assets/icons/moari-login.svg';
import { useDispatch } from 'react-redux';
import { loginUser } from 'actions/login';
import { RouteComponentProps } from 'react-router-dom';

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

const BottomWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 5px 0px;
`
const Label = styled.label`
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
`

const Find = styled.a`
    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    text-decoration: none;
    text-align: center;
    color: #1F2041;
`

const SignUp = styled.div`
    display : flex;
    justify-content : center;
    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 24px;
    display: flex;
    align-items: center;
    text-align: center;
    margin-top: 5px;


    color: rgba(31, 32, 65, 0.5);
`

const ToSignUp = styled.a`
    margin-left: 5px;
    font-family: Montserrat;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 24px;

    display: flex;
    align-items: center;
    text-align: center;
    text-decoration: none;
    color: linear-gradient(180deg, #BC9CFF 0%, #8BA4F9 100%) !important;
    &:visited{
        color: linear-gradient(180deg, #BC9CFF 0%, #8BA4F9 100%) !important;
    }
    &:hover{
        color: linear-gradient(180deg, #BC9CFF 0%, #8BA4F9 100%) !important;
    }
`

interface Props {
}


const LoginPage: FC<Props & RouteComponentProps> = ({ history }) => {
    const rememberMeChecked = localStorage.getItem("rememberMe") ? true : false;
    const handleRememberMe = () => {
        setRememberMe(!rememberMe);
    }
    const initialId :string = localStorage.getItem("rememberMe") ? localStorage.getItem("rememberMe")! : '';
    const [id,setId] = useState<string>(initialId);
    const [password,setPassword] = useState<string>('');
    const [rememberMe, setRememberMe] = useState<boolean>(rememberMeChecked);


    const dispatch = useDispatch();
    const handleLogin: (event : React.MouseEvent<HTMLImageElement, MouseEvent>) => void =  (event) => {
        event.preventDefault();
        dispatch(loginUser.request({id,password,history,rememberMe}));
    }

    return (
        <BaseLayout>
            <Root>
                <Wrapper>
                    <TopWrapper>
                        <Logo src={logo} />
                        <Title src={moariLogin}/>
                    </TopWrapper>
                    <LoginForm
                        description={text.loginId.description}
                        type={T.LoginFormType.INPUT}
                        height={'60px'}
                        setValue={setId}
                        initialValue={initialId}
                        value={id}
                    />
                    <LoginForm
                        description={text.password.description}
                        type={T.LoginFormType.PASSWORD}
                        height={'60px'}
                        setValue={setPassword}
                    />
                    <RegisterButton src={loginButtonSvg} onClick={handleLogin} />
                    <BottomWrapper>
                        <Label><CheckBox type="checkbox" name="maintainLogin" onChange={handleRememberMe} checked={rememberMe}/> 아이디 기억하기</Label>
                        <Find href="/">아이디 비밀번호 찾기</Find>
                    </BottomWrapper>
                    <SignUp> 모아리에 처음이신가요 ?<ToSignUp href="/signup"> 회원가입</ToSignUp> </SignUp>
                </Wrapper>
            </Root>
        </BaseLayout>
    );
}

export default LoginPage;