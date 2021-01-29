import React, { FC, ReactNode, useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Comment from 'types';
import { AuthResponse } from 'api/auth';
import Question from './Sections/Question';
import searchPurpleSvg from 'assets/icons/searchPurple.svg';
import Profile from './Sections/Profile';

const Wrapper = styled.div`
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
    width: 242px;
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

const QuestionForm = styled.div`
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
    cursor: pointer;
`

interface CommentProps {
    user: AuthResponse;
    clubId: string;
}

const CommentList: FC<CommentProps> = ({ user, clubId }) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [showForm, setShowForm] = useState<boolean>(false);
    const [content, setContent] = useState<string>('');
    const [searchKeyword, setSearchKeyword] = useState<string>('');

    const resize = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
        e.currentTarget.style.height = (20 + e.currentTarget.scrollHeight) + "px";
        setContent(e.target.value);
    }

    const onSubmit = () => {
        axios.post('/api/comment/saveComment', {
            writer: user._id,
            clubId,
            content
        }).then(response => {
            if(response.data.success){
                console.log('success')
            }
        })
        setShowForm(false);
        setContent('');
    }

    const onClickNewButton = () => {
        if(user.isAuth){
            setShowForm(!showForm);
            setContent('');
        } else {
            alert('먼저 로그인해주세요')
        }
    }

    const enterSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') {
            //TODD
            console.log(searchKeyword);
            //dispatch(searchQuestion.request({ clubId , keyword: searchKeyword }));
            setSearchKeyword('');
        }
    }

    const clickSearch = () => {
        console.log(searchKeyword);
        //dispatch(searchQuestion.request({ clubId , keyword: searchKeyword }));
        setSearchKeyword('');
    }

    // useEffect(() => {
    //     axios.get(`/api/comment/getComments/${clubId}`)
    //     .then(response=> {
    //         if(response.data.success){
    //             console.log(response.data.comments);
    //             setComments(response.data.comments);
    //         } else {
    //             alert('질문들을 가져오지 못했습니다.')
    //         }
    //     })
    // }, [showForm])

    axios.get(`/api/comment/getComments/${clubId}`)
        .then(response=> {
            if(response.data.success){
                setComments(response.data.comments);
            } else {
                alert('질문들을 가져오지 못했습니다.')
            }
    })

    const questionList: ReactNode = comments.map((question:Comment) => {
        return (
        <Question 
            key={question._id}
            user={user} 
            clubId={clubId} 
            comments={comments} 
            question={question} 
        />
        )
    })

    return (
        <>
            <Wrapper>
                <TopWrapper>
                    <SearchBoxWrapper>
                        <SearchBox
                            placeholder="질문 검색하기"
                            value={searchKeyword}
                            onChange={(e) => setSearchKeyword(e.target.value)}
                            onKeyPress={(e) => enterSearch(e)}
                        />
                        <SearchIcon 
                            src={searchPurpleSvg}
                            onClick={clickSearch}
                        />
                    </SearchBoxWrapper>
                    <NewButton onClick={onClickNewButton}>
                        {showForm? '질문 취소하기' : '질문 등록하기'}
                    </NewButton>
                </TopWrapper>
                { showForm && 
                <CommentContainer>
                    <QuestionForm> 
                        <Profile writer={user} />
                        <Content value={content} onChange={(e) => {resize(e)}} />
                        <SubmitButton onClick={onSubmit}>
                            등록하기
                        </SubmitButton>
                    </QuestionForm>
                </CommentContainer>
                }   
            </Wrapper>
            {questionList}
        </>
    )
}

export default CommentList;
