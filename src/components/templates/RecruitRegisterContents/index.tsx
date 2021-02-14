import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import RegisterForm from '../RegisterForm';
import * as T from 'types';
import text from './text';
import { postRecruit } from 'modules/postRecruit';
import registerButtonSvg from 'assets/icons/register-button.svg';
import { RouteComponentProps, withRouter } from 'react-router';

const Root = styled.div`
    display: flex;
    flex-direction: column;
`

const FormWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`

const Section = styled.div``

const RegisterButton = styled.img`
    transform: translateY(100%);
    &:hover {
        cursor: pointer;
    }
`
interface Props {

}

const RecruitRegisterContents: FC<Props & RouteComponentProps> = ({ history }) => {
    const [clubId, setClubId] = useState<string>('5fdc69aa557db83a55c525b4'); // mock data
    const [title, setTitle] = useState<string>(''); 
    const [duration, setDuration] = useState<string[]>([]);
    const [contact, setContact] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    const dispatch = useDispatch();
    
    useEffect(() => {
        console.log(duration);
    }, [duration]);

    const isRequiredEmpty: (input: string) => boolean = (input) => {
        return input === '';
    }

    const handlePostRecruit: () => void = () => {
        if (clubId === '') return requiredAlert(clubId, '동아리 이름');
        else if (title === '') return requiredAlert(title, '공고 제목');
        else if (contact === '') return requiredAlert(contact, '대표 연락처');

        dispatch(postRecruit.request({ 
            clubId, title, 
            startDate: duration[0], 
            endDate: duration[1], 
            contact, 
            description, 
            history 
        })); 
    }

    const requiredAlert: (type: any, text: string) => void = (type, text) => {
        alert(`[${text}]은/는 필수 항목입니다.`);
    }

    const dummyClubData = ['멋쟁이사자처럼', '스누버디', '사운드림'];

    return (
        <Root>
            <FormWrapper>
                <Section>
                    <RegisterForm
                        title={text.clubName.title}
                        description={text.clubName.description}
                        type={T.RegisterFormType.SELECT_BOX}
                        options={dummyClubData}
                        highlight={isRequiredEmpty(clubId)}
                        setValue={setClubId}
                        required={true}
                        height={'48px'}
                    />
                    <RegisterForm
                        title={text.recruitTitle.title}
                        description={text.recruitTitle.description}
                        type={T.RegisterFormType.INPUT}
                        highlight={isRequiredEmpty(title)}
                        setValue={setTitle}
                        required={true}
                        height={'48px'}
                    />
                    <RegisterForm 
                        title={text.recruitDuration.title}
                        description={[text.recruitDuration.description1, text.recruitDuration.description2]}
                        type={T.RegisterFormType.CALENDAR}
                        setValue={setDuration}
                        required={false}
                        height={'48px'}
                    />
                    <RegisterForm
                        title={text.recruitContact.title}
                        description={text.recruitContact.description}
                        type={T.RegisterFormType.INPUT}
                        highlight={isRequiredEmpty(contact)}
                        setValue={setContact}
                        required={true}
                        height={'48px'}
                    />
                </Section>
                <Section>
                    <RegisterForm 
                        title={text.recruitDetails.title}
                        description={text.recruitDetails.description}
                        type={T.RegisterFormType.TEXT_AREA}
                        highlight={isRequiredEmpty(description)}
                        setValue={setDescription}
                        required={false}
                        height={'600px'}
                    />
                </Section>
            </FormWrapper>
            <RegisterButton src={registerButtonSvg} onClick={() => handlePostRecruit()} />
        </Root>
    );
}

export default withRouter(RecruitRegisterContents);