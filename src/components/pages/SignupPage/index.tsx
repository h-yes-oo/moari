import React, { FC, useState, ReactNode } from 'react';
import styled from 'styled-components';
import SignupForm from '../../templates/SignupForm';
import text from './text';
import signUpButtonSvg from 'assets/icons/signup-button.svg';
import logo from 'assets/icons/logo.svg';
import moariSignUp from 'assets/icons/moari-signup.svg';
import palette from 'constants/palette';
import { useDispatch } from 'react-redux';
import { signupUser } from 'modules/signup';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Axios from 'axios';
import { USER_SERVER } from 'components/Config';
import { AuthResponse } from 'api/auth';

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
    color: ${palette.dark50.toString()};
`

const CheckBox = styled.input`
    border: 1px solid ${palette.dark50.toString()};
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
    user: AuthResponse;
}

const SignupPage: FC<Props & RouteComponentProps> = ({ history, user }) => {
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

    const [emailChecked, setEmailChecked] = useState<boolean>(false);
    const [emailText, setEmailText] = useState<string>(text.email.require);
    
    const [confirmPasswordChecked, setConfirmPasswordChecked] = useState<boolean>(false);
    const [confirmPasswordText, setConfirmPasswordText] = useState<string>(text.confirmPassword.check);
    
    const dispatch = useDispatch();

    const handleSignup: () => void = () => {
        if(!idChecked){
            alert(text.loginId.check);
            return;
        }
        if(!nicknameChecked){
            alert(text.nickname.check);
            return;
        }
        if(!emailChecked){
            alert(text.email.check);
            return;
        }
        if(!passwordChecked){
            alert(text.password.check);
            return;
        }
        if(!confirmPasswordChecked){
            alert(text.confirmPassword.check);
            return;
        }
        if(agreement === false) {
            alert(text.agreement.require);
            return;
        }
        dispatch(signupUser.request({id,password,email,name, history}));
    }

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
        if(!/^[가-힣a-zA-Z0-9_ ]{2,8}$/.test(e.target.value)) {
            setNicknameText(text.nickname.require);
            setNicknameChecked(false);
        } else {
            const response = await Axios.post<DuplicateResponse>(`${USER_SERVER}/duplicateCheckNickname`,{name : e.target.value}).then(response => response.data);
            if(response.success){
                if(response.duplicate){
                    setNicknameText(text.nickname.duplicate);
                    setNicknameChecked(false);
                } else {
                    setNicknameText(text.nickname.availabe)
                    setNicknameChecked(true);
                }
            }
        }
    }

    function onChangePassword(e:React.ChangeEvent<HTMLInputElement>){
        setPassword(e.target.value);
        if(confirmPassword !== e.target.value) {
            setConfirmPasswordText(text.confirmPassword.check);
            setConfirmPasswordChecked(false);
        } else {
            setConfirmPasswordText(text.confirmPassword.available);
            setConfirmPasswordChecked(true);
        }
        if(!/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/.test(e.target.value)) {
            setPasswordText(text.password.require);
            setPasswordChecked(false);
        } else{
            setPasswordText(text.password.availabe);
            setPasswordChecked(true);
        }
    }

    async function onChangeEmail(e:React.ChangeEvent<HTMLInputElement>){
        setEmail(e.target.value);
        const emailRegex = new RegExp('^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@'+text.email.school+'$','i')
        if(!emailRegex.test(e.target.value)) {
            setEmailText(text.email.require);
            setEmailChecked(false);
        } else{
            const response = await Axios.post<DuplicateResponse>(`${USER_SERVER}/duplicateCheckEmail`,{email : e.target.value}).then(response => response.data);
            if(response.success){
                if(response.duplicate){
                    setEmailText(text.email.duplicate);
                    setEmailChecked(false);
                } else {
                    setEmailText(text.email.available);
                    setEmailChecked(true);
                }
            }
        
        }
    }

    function onChangeConfirmPassword(e:React.ChangeEvent<HTMLInputElement>){
        setConfirmPassword(e.target.value);
        if(password !== e.target.value) {
            setConfirmPasswordText(text.confirmPassword.check);
            setConfirmPasswordChecked(false);
        } else{
            setConfirmPasswordText(text.confirmPassword.available);
            setConfirmPasswordChecked(true);
        }
    }

    const idColoredText: ReactNode = idChecked ? <VioletTextDiv>{idText}</VioletTextDiv> : <RedTextDiv>{idText}</RedTextDiv>;
    const nicknameColoredText: ReactNode = nicknameChecked ? <VioletTextDiv>{nicknameText}</VioletTextDiv> : <RedTextDiv>{nicknameText}</RedTextDiv>;
    const emailColoredText: ReactNode = emailChecked ? <VioletTextDiv>{emailText}</VioletTextDiv> : <RedTextDiv>{emailText}</RedTextDiv>;
    const passwordColoredText: ReactNode = passwordChecked ? <VioletTextDiv>{passwordText}</VioletTextDiv> : <RedTextDiv>{passwordText}</RedTextDiv>;
    const confirmPasswordColoredText: ReactNode = confirmPasswordChecked ? <VioletTextDiv>{confirmPasswordText}</VioletTextDiv> : <RedTextDiv>{confirmPasswordText}</RedTextDiv>;

    return (
        <Root>
            <Wrapper>
                <TopWrapper>
                    <Logo src={logo} />
                    <Title src={moariSignUp}/>
                </TopWrapper>
                <SignupForm
                    description={text.loginId.description}
                    value={id}
                    onChange={onChangeId}
                />
                {idColoredText}
                <SignupForm
                    description={text.nickname.description}
                    value={name}
                    onChange={onChangeNickname}
                />
                {nicknameColoredText}
                <SignupForm
                    description={text.email.description}
                    value={email}
                    onChange={onChangeEmail}
                    type="email"
                />
                {emailColoredText}
                <SignupForm
                    description={text.password.description}
                    value={password}
                    onChange={onChangePassword}
                    type="password"
                />
                {passwordColoredText}
                <SignupForm
                    description={text.confirmPassword.description}
                    value={confirmPassword}
                    onChange={onChangeConfirmPassword}
                    type="password"
                />
                {confirmPasswordColoredText}
                <Agreement value={agreementText} readOnly disabled></Agreement>
                <Label><CheckBox type="checkbox" name="maintainLogin" checked={agreement} onChange={()=>{setAgreement(!agreement);}}/> 약관 동의</Label>
                <RegisterButton src={signUpButtonSvg} onClick={() => handleSignup()} />
            </Wrapper>
        </Root>
    );
}

export default withRouter(SignupPage);