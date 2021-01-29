import React, { FC, useState } from 'react';
import styled, { StyledComponent } from 'styled-components';
import { AuthResponse } from 'api/auth';
import searchPurpleSvg from 'assets/icons/searchPurple.svg';

const Root = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 42px;
`
const TopWrapper = styled.div`
    display: flex;
    width: 1195px;
    align-items: flex-end;
    justify-content: space-between;
`

const SearchBoxWrapper = styled.div`
    display: flex;
    align-items: center;
    width: 274px;
    height: 47px;
    padding: 0 16px;

    background: rgba(238, 238, 238, 0.5);
    border-radius: 7px;
`

const SearchIcon = styled.img`
    width: 26px;
    height: 26px;
    opacity: 0.5;
    cursor: pointer;
`

const SearchBox = styled.input`
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;

    border: none;
    background: transparent;

    font-family: Montserrat;
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 24px;
    color: rgba(31, 32, 65, 0.5);

    &:focus {
        outline: none;
    }
`

const NewButton = styled.a`
    height: 24px;

    font-family: Montserrat;
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    line-height: 24px;

    display: flex;
    align-items: center;

    color: rgba(31, 32, 65, 0.5);

    cursor: pointer;
`

const CommentContainer = styled.div`
    width: 1195px;
    margin-top: 33px;
    padding-top: 30px;
    padding-bottom: 30px;

    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(188, 156, 255, 0.23);
    border-radius: 8px;
`

const Profile = styled.div`
    display: flex;
    margin-right: 14px;
    align-items: flex-start;
`

const ProfileImage = styled.img`
    width: 34px;
    height: 34px;
    border: 2px solid #FFFFFF;
    filter: drop-shadow(0px 10px 20px rgba(31, 32, 65, 0.1));
    border-radius: 24px;
`

const ProfileName = styled.div`
    width: 144px;
    height: 34px;
    margin-left: 10px;

    font-family: Montserrat;
    font-style: normal;
    font-weight: bold;
    font-size: 20px;

    display: flex;
    align-items: center;

    background: -webkit-linear-gradient(180deg, #BC9CFF 0%, #8BA4F9 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`

const Question = styled.div`
    display: flex;
    margin-left: 40px;
    position: relative;
`

const Content = styled.textarea`
    font-family: Montserrat;
    font-style: normal;
    font-weight: 600;
    font-size: 20px;

    width: 800px;
    height: auto;
    margin-top: 7px;

    border: 1px solid #BC9CFF;
    box-sizing: border-box;
    border-radius: 4px;
    color: rgba(31, 32, 65, 0.75);
    overflow: scroll;

    &::-webkit-scrollbar { width: 0 !important };
    &:focus {
        outline: none;
    }
`

const SubmitButton = styled.a`
    display: flex;
    align-items: center;
    position: absolute;
    right: 30px;
    bottom: 0px;

    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 10px;

    color: rgba(31, 32, 65, 0.5);
`

interface CommentProps {
    user: AuthResponse;
}

const CommentForm: FC<CommentProps> = ({ user }) => {
    const [showForm, setShowForm] = useState<boolean>(false);
    const [content, setContent] = useState<string>('');

    const resize = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
        e.currentTarget.style.height = (20 + e.currentTarget.scrollHeight) + "px";
        setContent(e.target.value);
    }

    const onSubmit = () => {
        setShowForm(false);
        setContent('');
        //TODO
    }

    const onClickNewButton = () => {
        setShowForm(!showForm);
        setContent('');
    }

    if(user.isAuth){
        return (
            <Root>
                <TopWrapper>
                    <SearchBoxWrapper>
                        <SearchBox/>
                        <SearchIcon src={searchPurpleSvg}/>
                    </SearchBoxWrapper>
                    <NewButton onClick={onClickNewButton}>
                        {showForm? '질문 취소하기' : '질문 등록하기'}
                    </NewButton>
                </TopWrapper>
                { showForm && 
                <CommentContainer>
                    <Question> 
                        <Profile> 
                            <ProfileImage src={user.image} />
                            <ProfileName>{user.name}</ProfileName>
                        </Profile>
                        <Content value={content} onChange={(e) => {resize(e)}} />
                        <SubmitButton onClick={onSubmit}>
                            등록하기
                        </SubmitButton>
                    </Question>
                </CommentContainer>
                }   
            </Root>
            )
    } else {
        return null
    }
}

export default CommentForm;
