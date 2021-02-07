import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { postClub } from 'modules/post';
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

const ClubRegisterContents: FC<Props & RouteComponentProps> = ({ history }) => {
    const [name, setName] = useState<string>(''); // required
    const [school, setSchool] = useState<string>(''); // required
    const [description, setDescription] = useState<string>('');
    const [photos, setPhotos] = useState<FileList>();
    const [status, setStatus] = useState<string>(''); // required
    const [category, setCategory] = useState<string>(''); // required
    const [tags, setTags] = useState<string[]>([]);
    const [managerIds, setManagerIds] = useState<string[]>([]);

    // const clubs = useSelector((state: RootState) => state.club);
    const dispatch = useDispatch();

    const handlePostClub: () => void = () => {
        if (name === '') return requiredAlert(name, '이름');
        else if (school === '') return requiredAlert(school, '학교 정보');
        else if (status === '') return requiredAlert(status, '모집 방법');
        else if (category === '') return requiredAlert(category, '분류');

        dispatch(postClub.request({ name, school, description, photos, category, tags, status, history })); 
        //alert('동아리 등록 성공! 😆');
        // history.push('/');
    }

    const requiredAlert: (type: any, text: string) => void = (type, text) => {
        alert(`[${text}]은/는 필수 항목입니다.`);
        return;
    }

    const isRequiredEmpty: (input: string) => boolean = (input) => {
        return input === '';
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
                        required={true}
                        highlight={isRequiredEmpty(name)}
                        setValue={setName}
                    />
                    <RegisterForm
                        title={text.clubInfo.title}
                        description={text.clubInfo.description}
                        type={T.RegisterFormType.INPUT}
                        height={'100px'}
                        required={true}
                        highlight={isRequiredEmpty(school)}
                        setValue={setSchool}
                    />
                    <RegisterForm 
                        title={text.clubDetail.title}
                        description={text.clubDetail.description}
                        type={T.RegisterFormType.TEXT_AREA}
                        height={'600px'}
                        required={false}
                        setValue={setDescription}
                    />
                </Section>
                <Section>
                    <RegisterForm 
                        title={text.photo.title}
                        description={text.photo.description}
                        type={T.RegisterFormType.FILE}
                        height={'48px'}
                        required={false}
                        setValue={setPhotos}
                    />
                    <RegisterForm 
                        title={text.status.title}
                        description={text.status.description}
                        type={T.RegisterFormType.SELECT_BOX}
                        options={Object.values(T.Status)}
                        height={'48px'}
                        required={true}
                        highlight={isRequiredEmpty(status)}
                        setValue={setStatus}
                    />
                    <RegisterForm 
                        title={text.category.title}
                        description={text.category.description}
                        type={T.RegisterFormType.SELECT_BOX}
                        options={Object.values(T.Category)}
                        height={'48px'}
                        required={true}
                        highlight={isRequiredEmpty(category)}
                        setValue={setCategory}
                    />
                    <RegisterForm 
                        title={text.tag.title}
                        description={text.tag.description}
                        type={T.RegisterFormType.INPUT}
                        height={'48px'}
                        required={false}
                        setValue={setTags}
                    />
                    <RegisterForm 
                        title={text.managerId.title}
                        guide={text.managerId.description}
                        description={"jieun hyesoo"}
                        type={T.RegisterFormType.INPUT_ADDABLE}
                        height={'48px'}
                        required={false}
                        setValue={setManagerIds}
                    />
                </Section>
            </FormWrapper>
            <RegisterButton src={registerButtonSvg} onClick={() => handlePostClub()} />
        </Root>
    );
}

export default withRouter(ClubRegisterContents);