import React, { ReactNode, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { deleteComment, saveComment } from 'modules/comment';
import { AuthResponse } from 'api/auth';
import Profile from './Profile';
import Comment from 'types';

const Root = styled.div`
  width: 1195px;
  margin-top: 33px;
  padding-top: 30px;
  padding-bottom: 30px;

  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(188, 156, 255, 0.23);
  border-radius: 8px;
`;

const QuestionWrapper = styled.div`
  display: flex;
  margin-left: 40px;
  position: relative;
`;

const Content = styled.div`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;

  width: 690px;
  height: fit-content;
  display: inline-block;
  word-wrap: break-word;
  white-space: normal;
  line-height: 20px;
  vertical-align: middle;
  margin-top: 7px;

  color: rgba(31, 32, 65, 0.75);
`;

const Answer = styled.div`
  display: flex;
  margin-top: 30px;
  margin-left: 80px;
  position: relative;
`;

const AnswerForm = styled.div`
  display: flex;
  margin-top: 30px;
  margin-left: 80px;
  position: relative;
`;

const EraseButton = styled.a`
  height: 21px;

  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 24px;

  display: flex;
  align-items: center;

  color: rgba(31, 32, 65, 0.5);

  cursor: pointer;
`;

const AnswerButton = styled.a`
  height: 21px;
  margin-left: 20px;

  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 24px;

  display: flex;
  align-items: center;

  color: rgba(31, 32, 65, 0.5);

  cursor: pointer;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  right: 30px;
  bottom: 0px;
`;

const Date = styled.div`
  height: 10px;
  margin-left: 20px;

  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 10px;

  display: flex;
  align-items: center;

  color: rgba(31, 32, 65, 0.5);
`;

const ContentInput = styled.textarea`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;

  width: 800px;
  height: auto;
  margin-top: 7px;

  border: 1px solid #bc9cff;
  box-sizing: border-box;
  border-radius: 4px;
  color: rgba(31, 32, 65, 0.75);
  overflow: scroll;

  &::-webkit-scrollbar {
    width: 0 !important;
  }
  &:focus {
    outline: none;
  }
`;

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
`;

interface CommentProps {
  user: AuthResponse;
  clubId: string;
  question: Comment;
  comments: Comment[];
  refreshFunction: any;
}

const Question = ({ user, clubId, question, comments, refreshFunction }: CommentProps) => {
  const [showAnswerForm, setShowAnswerForm] = useState<boolean>(false);
  const [content, setContent] = useState<string>('');

  const dispatch = useDispatch();

  const onNewAnswer = () => {
    if (user.isAuth) {
      setShowAnswerForm(!showAnswerForm);
      setContent('');
    } else {
      alert('먼저 로그인해주세요');
    }
  };

  const resize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.currentTarget.style.height = 20 + e.currentTarget.scrollHeight + 'px';
    setContent(e.target.value);
  };

  const onSubmit = async (responseTo: string) => {
    dispatch(
      saveComment.request({
        writer: user._id,
        clubId,
        content,
        responseTo,
      })
    );
    setShowAnswerForm(false);
    setContent('');
    refreshFunction();
  };

  const onDelete = async (commentId: string) => {
    dispatch(deleteComment.request({ commentId }));
    refreshFunction();
  };

  const answers = comments.filter((comment) => comment.responseTo === question._id);

  const answerList: ReactNode = answers.map((answer: Comment) => (
    <Answer key={answer._id}>
      <Profile writer={answer.writer} />
      <Content>{answer.content}</Content>
      <ButtonWrapper>
        {answer.writer._id === user._id && <EraseButton onClick={() => onDelete(answer._id)}>지우기</EraseButton>}
        <Date>{answer.createdDate}</Date>
      </ButtonWrapper>
    </Answer>
  ));

  return question.responseTo ? null : (
    <Root key={question._id}>
      <QuestionWrapper>
        <Profile writer={question.writer} />
        <Content>{question.content}</Content>
        <ButtonWrapper>
          {question.writer._id === user._id && <EraseButton onClick={() => onDelete(question._id)}>지우기</EraseButton>}
          <AnswerButton onClick={onNewAnswer}>답변하기</AnswerButton>
          <Date>{question.createdDate}</Date>
        </ButtonWrapper>
      </QuestionWrapper>
      {answerList}
      {showAnswerForm && (
        <AnswerForm>
          <Profile writer={user} />
          <ContentInput
            value={content}
            onChange={(e) => {
              resize(e);
            }}
          />
          <SubmitButton onClick={() => onSubmit(question._id)}>등록하기</SubmitButton>
        </AnswerForm>
      )}
    </Root>
  );
};

export default Question;
