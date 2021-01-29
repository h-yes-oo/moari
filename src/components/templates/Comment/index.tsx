import React, { FC } from 'react';
import styled from 'styled-components';
import chick from 'assets/userIconSamples/chick.svg';

const Root = styled.div`
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
`

const Answer = styled.div`
    display: flex;
    margin-top: 30px;
    margin-left: 80px;
    position: relative;
`

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
`

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
`

const ButtonWrapper = styled.div`
    display: flex;
    align-items: center;
    position: absolute;
    right: 30px;
    bottom: 0px;
`

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
`

interface CommentProps {

}

const Comment: FC<CommentProps> = ({}) => {
    return (
        <Root>
            <Question> 
                <Profile> 
                    <ProfileImage src={chick} />
                    <ProfileName>지나가던 병아리</ProfileName>
                </Profile>
                <Content>
                    2021년 1학기에도 모집 예정이신가요 ? dkaldjfakdjfaldkjfkadjflajfkaldjfakldjflkadjfakldjfalkdjfkladjflkadjfalkjfkadfldfalkdjflakdjfkladjflkadjfkladjflkadjfkaljflakdjfkladjf
                </Content>
                <ButtonWrapper>
                    <EraseButton onClick={() => {}}>지우기</EraseButton>
                    <AnswerButton onClick={() => {}}>답변하기</AnswerButton>
                    <Date>2021/1/3</Date>
                </ButtonWrapper>
            </Question>
            <Answer>
                <Profile> 
                    <ProfileImage src={chick} />
                    <ProfileName>지나가던 병아리</ProfileName>
                </Profile>
                <Content>
                    2021년 1학기에도 모집 예정이신가요? ajdkflajdlkfajdlkfjaldkfjalkdjflakdjflkadfadfjladjfklajdflkajdlkfjakldfjalkdjflakjdflkadjflakdjflakdjflakdjflakdjflakjflkadjflkdadljfjalkdfjlakdjflak<br/>
                    하이하이하이허아ㅓ미하어미험아허미아허미ㅏㅇㅎ
                </Content>
                <ButtonWrapper>
                    <EraseButton onClick={() => {}}>지우기</EraseButton>
                    <Date>2021/1/3</Date>
                </ButtonWrapper>
            </Answer>
        </Root>
    )
}

export default Comment;
