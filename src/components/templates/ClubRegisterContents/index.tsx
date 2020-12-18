import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import RegisterForm from '../RegisterForm';
import * as T from 'types';
import text from './text';
import registerButtonSvg from 'assets/icons/register-button.svg';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'reducers';
import { postClub } from 'actions/club';
import { RouteComponentProps, withRouter } from 'react-router-dom';

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

const ClubRegisterContents: FC<Props & RouteComponentProps> = ({ history }) => {
    const [name, setName] = useState<string>('');
    const [school, setSchool] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [photos, setPhotos] = useState<FileList>();
    const [recruit, setRecruit] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [tags, setTags] = useState<string[]>([]);
    const [managerIds, setManagerIds] = useState<string[]>([]);

    // const clubs = useSelector((state: RootState) => state.club);
    const dispatch = useDispatch();

    const handlePostClub: () => void = () => {
        // 실패 alert 필요
        dispatch(postClub.request({ name, school, description, photos, category, tags, recruit })); 
        alert('동아리 등록 성공! 😆');
        // history.push('/');
    }

    return (
        // 반복되는 부분은 추후 refactoring 예정
        <Root>
            <FormWrapper>
                <Section>
                    <RegisterForm
                        title={text.clubName.title}
                        description={text.clubName.description}
                        type={T.RegisterFormType.INPUT}
                        height={'48px'}
                        setValue={setName}
                    />
                    <RegisterForm
                        title={text.clubInfo.title}
                        description={text.clubInfo.description}
                        type={T.RegisterFormType.INPUT}
                        height={'100px'}
                        setValue={setSchool}
                    />
                    <RegisterForm 
                        title={text.clubDetail.title}
                        description={text.clubDetail.description}
                        type={T.RegisterFormType.TEXT_AREA}
                        height={'600px'}
                        setValue={setDescription}
                    />
                </Section>
                <Section>
                    <RegisterForm 
                        title={text.photo.title}
                        description={text.photo.description}
                        type={T.RegisterFormType.FILE}
                        height={'48px'}
                        setValue={setPhotos}
                    />
                    <RegisterForm 
                        title={text.recruit.title}
                        description={text.recruit.description}
                        type={T.RegisterFormType.SELECT_BOX}
                        options={Object.values(T.Status)}
                        height={'48px'}
                        setValue={setRecruit}
                    />
                    <RegisterForm 
                        title={text.category.title}
                        description={text.category.description}
                        type={T.RegisterFormType.SELECT_BOX}
                        options={Object.values(T.Category)}
                        height={'48px'}
                        setValue={setCategory}
                    />
                    <RegisterForm 
                        title={text.tag.title}
                        description={text.tag.description}
                        type={T.RegisterFormType.INPUT}
                        height={'48px'}
                        setValue={setTags}
                    />
                    <RegisterForm 
                        title={text.managerId.title}
                        guide={text.managerId.description}
                        description={"jieun hyesoo"}
                        type={T.RegisterFormType.INPUT_ADDABLE}
                        height={'48px'}
                        setValue={setManagerIds}
                    />
                </Section>
            </FormWrapper>
            <RegisterButton src={registerButtonSvg} onClick={() => handlePostClub()} />
        </Root>
    );
}

export default withRouter(ClubRegisterContents);