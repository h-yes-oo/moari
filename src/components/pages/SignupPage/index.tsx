import React, { FC, useState } from 'react';
import BaseLayout from 'components/templates/BaseLayout';
import styled from 'styled-components';
//import LoginForm from '../../templates/LoginForm';
import SignupForm from '../../templates/SignupForm';
import text from './text';
import * as T from 'types';
import signUpButtonSvg from 'assets/icons/signup-button.svg';
import logo from 'assets/icons/logo.svg';
import moariSignUp from 'assets/icons/moari-signup.svg';
//import duplicateCheckSvg from 'assets/icons/duplicate-check.svg';
import palette from 'constants/palette';
import { useDispatch } from 'react-redux';
import { signupUser } from 'modules/signup';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Axios from 'axios';
import { USER_SERVER } from 'components/Config';

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
    align-contents: center;
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

const VioletTextDiv = styled.div`
    display: flex;
    align-items: center;
    color: ${palette.primaryViolet.toString()}
`

const RedTextDiv = styled.div`
    display: flex;
    align-items: center;
    color: #cb240d
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
    const [idChecked, setIdChecked] = useState<boolean>(false);
    const [idText, setIdText] = useState<string>(text.loginId.require);
    const [nicknameChecked, setNicknameChecked] = useState<boolean>(false);
    const [nicknameText, setNicknameText] = useState<string>(text.nickname.require);
    const [passwordChecked, setPasswordChecked] = useState<boolean>(false);
    const [passwordText, setPasswordText] = useState<string>(text.password.require);
    
    const dispatch = useDispatch();

    const handleSignup: () => void = () => {
        if(!idChecked){
            alert(text.loginId.check);
            return
        }
        if(!nicknameChecked){
            alert(text.nickname.check);
            return
        }
        if(!passwordChecked){
            alert(text.password.check);
            return
        }
        if(password !== confirmPassword){
            alert(text.confirmPassword.check);
            return;
        }
        if(agreement === false) {
            alert(text.agreement.require);
            return;
        }
        dispatch(signupUser.request({id,password,email,name, history}));
    }

    // const duplicateCheck: () => void = () => {
    //     //TODO
    // }

    const agreementText = text.agreement.text;

    interface DuplicateResponse {
        success: boolean,
        duplicate: boolean
    }

    async function onChangeId (e:React.ChangeEvent<HTMLInputElement>) {
        setId(e.target.value);
        if(!/^[a-zA-Z0-9]{6,16}$/.test(e.target.value)){
            setIdText(text.loginId.require);
            setIdChecked(false);            
        } else {
            const response = await Axios.post<DuplicateResponse>(`${USER_SERVER}/duplicateCheckId`,{id : e.target.value}).then(response => response.data);
            if(response.success){
                if(response.duplicate){
                    setIdText(text.loginId.duplicate);
                    setIdChecked(false);
                } else {
                    setIdText(text.loginId.availabe)
                    setIdChecked(true);
                }
            }
        }
    }

    async function onChangeNickname(e:React.ChangeEvent<HTMLInputElement>){
        setNickname(e.target.value);
        if(!/^[가-힣a-zA-Z0-9]{2,16}$/.test(e.target.value)) {
            setNicknameText("닉네임은 2~16자로 설정해주세요");
            setNicknameChecked(false);
        } else {
            const response = await Axios.post<DuplicateResponse>(`${USER_SERVER}/duplicateCheckNickname`,{name : e.target.value}).then(response => response.data);
            if(response.success){
                if(response.duplicate){
                    setNicknameText("이미 사용중인 닉네임입니다");
                    setNicknameChecked(false);
                } else {
                    setNicknameText("사용가능한 닉네임입니다")
                    setNicknameChecked(true);
                }
            }
        }
    }

    function onChangePassword(e:React.ChangeEvent<HTMLInputElement>){
        setPassword(e.target.value);
        if(!/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/.test(e.target.value)) {
            setPasswordText("비밀번호는 8~16자로 설정해주세요");
            setPasswordChecked(false);
        } else{
            setPasswordText("사용가능한 비밀번호입니다");
            setPasswordChecked(true);
        }
    }

    return (
        <BaseLayout>
            <Root>
                <Wrapper>
                    <TopWrapper>
                        <Logo src={logo} />
                        <Title src={moariSignUp}/>
                    </TopWrapper>
                    {/* <NickNameWrapper>
                        <SignupForm
                            description={text.loginId.description}
                            value={id}
                            onChange={onChangeId}
                            width='180px'
                        />
                        {idChecked && <VioletTextDiv>{idText}</VioletTextDiv>}
                        {!idChecked && <RedTextDiv>{idText}</RedTextDiv>}
                    </NickNameWrapper> */}
                    <SignupForm
                        description={text.loginId.description}
                        value={id}
                        onChange={onChangeId}
                    />
                    {idChecked && <VioletTextDiv>{idText}</VioletTextDiv>}
                    {!idChecked && <RedTextDiv>{idText}</RedTextDiv>}
                    {/* <NickNameWrapper>
                        <SignupForm
                            description={text.nickname.description}
                            value={name}
                            onChange={onChangeNickname}
                            width='180px'
                        />
                        {nicknameChecked && <VioletTextDiv>{nicknameText}</VioletTextDiv>}
                        {!nicknameChecked && <RedTextDiv>{nicknameText}</RedTextDiv>}
                    </NickNameWrapper> */}
                    <SignupForm
                            description={text.nickname.description}
                            value={name}
                            onChange={onChangeNickname}
                        />
                        {/* <DuplicateButton src={duplicateCheckSvg} onClick={() => duplicateCheck()} /> */}
                    {nicknameChecked && <VioletTextDiv>{nicknameText}</VioletTextDiv>}
                    {!nicknameChecked && <RedTextDiv>{nicknameText}</RedTextDiv>}
                    <SignupForm
                        description={text.email.description}
                        value={email}
                        setValue={setEmail}
                        type="email"
                    />
                    <SignupForm
                        description={text.password.description}
                        value={password}
                        onChange={onChangePassword}
                        type="password"
                    />
                    {passwordChecked && <VioletTextDiv>{passwordText}</VioletTextDiv>}
                    {!passwordChecked && <RedTextDiv>{passwordText}</RedTextDiv>}
                    <SignupForm
                        description={text.confirmPassword.description}
                        value={confirmPassword}
                        setValue={setConfirmPassword}
                        type="password"
                    />
                    <Agreement value={agreementText} readOnly disabled></Agreement>
                    <Label><CheckBox type="checkbox" name="maintainLogin" checked={agreement} onChange={()=>{setAgreement(!agreement);}}/> 약관 동의</Label>
                    <RegisterButton src={signUpButtonSvg} onClick={() => handleSignup()} />
                </Wrapper>
            </Root>
        </BaseLayout>
    );
}

export default withRouter(SignupPage);