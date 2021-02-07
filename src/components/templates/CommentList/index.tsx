import React, { FC, ReactNode, useState, useEffect } from 'react';
import styled from 'styled-components';
import Comment from 'types';
import { AuthResponse } from 'api/auth';
import Question from './Sections/Question';
import searchPurpleSvg from 'assets/icons/searchPurple.svg';
import Profile from './Sections/Profile';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComments, searchComments } from 'modules/comments';
import { saveComment } from 'modules/comment';
import { RootState } from 'modules'
import Loading from '../Loading';

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
    margin-top: 7px;
    height: 88px;

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
    const [showForm, setShowForm] = useState<boolean>(false);
    const [content, setContent] = useState<string>('');
    const [searchKeyword, setSearchKeyword] = useState<string>('');
    const [refresh, setRefresh] = useState<boolean>(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchComments.request({ clubId }));
    }, [refresh])

    const refreshFunction = () => {
        setRefresh(!refresh);
        dispatch(fetchComments.request({ clubId }));
    }

    const commentsData = useSelector((state: RootState) => state.comments.data);

    const resize = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
        const contentHeight = 20 + e.currentTarget.scrollHeight;
        e.currentTarget.style.height = contentHeight + "px";
        setContent(e.target.value);
    }

    async function onSubmit() {
        dispatch(saveComment.request({
            writer: user._id,
            clubId,
            content
        }))
        setShowForm(false);
        setContent('');
        refreshFunction();
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
            clickSearch();
        }
    }

    const clickSearch = () => {
        if(searchKeyword === ''){
            dispatch(fetchComments.request({ clubId }))
        } else{
            dispatch(searchComments.request({ clubId, keyword: searchKeyword}));
            setSearchKeyword('');
        }
    }

    let questionList: ReactNode = <Loading />;

    if(commentsData){
        const comments = commentsData!.comments;
        questionList = comments
                        .filter(comment => !comment.responseTo)
                        .reverse()
                        .map((question: Comment) => {
                            return (
                            <Question 
                                key={question._id}
                                user={user} 
                                clubId={clubId} 
                                comments={comments} 
                                question={question}
                                refreshFunction={refreshFunction}
                            />)
                        })
    }

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
                        <Content value={content} onChange={(e) => resize(e)} />
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
