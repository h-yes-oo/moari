import React, { FC, useState } from 'react';
import styled from 'styled-components';
import RegisterForm from '../RegisterForm';
import * as T from 'types';
import text from './text';
import registerButtonSvg from 'assets/icons/register-button.svg';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'reducers';
import { postClub } from 'actions/club';

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
`

interface Props {

}

const ClubRegisterContents: FC<Props> = () => {
    const [name, setName] = useState<string>('');
    const [school, setSchool] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    const clubs = useSelector((state: RootState) => state.club);
    const dispatch = useDispatch();

    const handlePostClub: () => void = () => {
        dispatch(postClub.request({ name, school, description })); 
    }

    return (
        // 반복되는 부분은 추후 refactoring 예정, 혜수's 과제를 위해 남겨놓음
        <Root>
            <FormWrapper>
                <Section>
                    <RegisterForm
                        title={text.clubName.title}
                        description={text.clubName.description}
                        type={T.RegisterFormType.INPUT}
                        height={'48px'}
                        onChange={setName}
                    />
                    <RegisterForm
                        title={text.clubInfo.title}
                        description={text.clubInfo.description}
                        type={T.RegisterFormType.INPUT}
                        height={'100px'}
                        onChange={setSchool}
                    />
                    <RegisterForm 
                        title={text.clubDetail.title}
                        description={text.clubDetail.description}
                        type={T.RegisterFormType.TEXT_AREA}
                        height={'600px'}
                        onChange={setDescription}
                    />
                </Section>
                <Section>
                    <RegisterForm 
                        title={text.photo.title}
                        description={text.photo.description}
                        type={T.RegisterFormType.FILE}
                        height={'48px'}
                    />
                    <RegisterForm 
                        title={text.recruit.title}
                        description={text.recruit.description}
                        type={T.RegisterFormType.SELECT_BOX}
                        height={'48px'}
                    />
                    <RegisterForm 
                        title={text.category.title}
                        description={text.category.description}
                        type={T.RegisterFormType.SELECT_BOX}
                        height={'48px'}
                    />
                    <RegisterForm 
                        title={text.tag.title}
                        description={text.tag.description}
                        type={T.RegisterFormType.SELECT_BOX}
                        height={'48px'}
                    />
                    <RegisterForm 
                        title={text.managerId.title}
                        guide={text.managerId.description}
                        description={"jieun hyesoo"}
                        type={T.RegisterFormType.INPUT}
                        height={'48px'}
                    />
                </Section>
            </FormWrapper>
            <RegisterButton src={registerButtonSvg} onClick={() => handlePostClub()} />
        </Root>
    );
}

export default ClubRegisterContents;