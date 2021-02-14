import React, { FC, ReactNode, useState } from 'react';
import styled from 'styled-components';
import RegisterForm from '../RegisterForm';
import * as T from 'types';
import text from './text';
import registerButtonSvg from 'assets/icons/register-button.svg';

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

const ClubRegisterContents: FC<Props> = () => {
    const [clubName, setClubName] = useState<string>(''); // required
    const [recruitTitle, setRecruitTitle] = useState<string>(''); // required
    const [recruitDuration, setRecruitDuration] = useState<string>('');
    const [recruitContact, setRecruitContact] = useState<string>('');
    const [recruitDetails, setRecruitDetails] = useState<string>('');
    
    const isRequiredEmpty: (input: string) => boolean = (input) => {
        return input === '';
    }

    const handlePostRecruit: () => void = () => {
        alert('모집 공고를 등록합니다.');    
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
                        highlight={isRequiredEmpty(clubName)}
                        setValue={setClubName}
                        required={true}
                        height={'48px'}
                    />
                    <RegisterForm
                        title={text.recruitTitle.title}
                        description={text.recruitTitle.description}
                        type={T.RegisterFormType.INPUT}
                        highlight={isRequiredEmpty(recruitTitle)}
                        setValue={setRecruitTitle}
                        required={true}
                        height={'48px'}
                    />
                    <RegisterForm 
                        title={text.recruitDuration.title}
                        description={[text.recruitDuration.description1, text.recruitDuration.description2]}
                        type={T.RegisterFormType.CALENDAR}
                        required={false}
                        height={'48px'}
                    />
                    <RegisterForm
                        title={text.recruitContact.title}
                        description={text.recruitContact.description}
                        type={T.RegisterFormType.INPUT}
                        highlight={isRequiredEmpty(recruitContact)}
                        setValue={setRecruitContact}
                        required={false}
                        height={'48px'}
                    />
                </Section>
                <Section>
                    <RegisterForm 
                        title={text.recruitDetails.title}
                        description={text.recruitDetails.description}
                        type={T.RegisterFormType.TEXT_AREA}
                        highlight={isRequiredEmpty(recruitDetails)}
                        setValue={setRecruitDetails}
                        required={true}
                        height={'600px'}
                    />
                </Section>
            </FormWrapper>
            <RegisterButton src={registerButtonSvg} onClick={() => handlePostRecruit()} />
        </Root>
    );
}

export default ClubRegisterContents;