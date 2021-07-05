import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import palette from 'constants/palette';
import sampleImg from 'assets/samples/likelion.jpg';
import Story from 'types';

const StoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  position: relative;

  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(188, 156, 255, 0.5);
  border-radius: 31px;

  padding: 30px 20px 80px 20px;
  margin: 0px 20px 50px 20px;
`;

const Content = styled.div`
  margin-top: 54px;

  font-family: Montserrat;
  font-style: normal;
  font-size: 18px;
  line-height: 24px;

  display: flex;
  align-items: center;
  text-align: center;

  white-space: pre-line;

  color: ${palette.dark100.toString()};
`;

const Date = styled.div`
  position: absolute;
  right: 30px;
  bottom: 24px;

  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;

  display: flex;
  align-items: center;
  text-align: center;

  color: ${palette.dark75.toString()};
`;

const Image = styled.img`
  width: 100%;
`;

const Root = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
`;

const NewButton = styled.a`
  margin-bottom: 20px;

  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 24px;

  display: flex;
  align-items: center;
  justify-content: flex-end;

  color: ${palette.dark50.toString()};
  cursor: pointer;
`;

const Row = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-flow: row wrap;
  flex-flow: row wrap;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
`;

const Col = styled.div`
  position: relative;
  display: block;
  -webkit-box-flex: 0;
  -ms-flex: 0 0 50%;
  flex: 0 0 50%;
  max-width: 50%;
  min-height: 1px;
`;

interface Props {
  clubId: string;
}

const StoryList = ({ clubId }: Props) => {
  const [stories, setStories] = useState<Story[]>([]);

  const onClickNewButton = () => {};

  useEffect(() => {
    axios.get(`/api/story/getStories/${clubId}`).then((res) => {
      if (res.data.success) {
        setStories(res.data.stories);
      } else {
        console.log(res.data.error);
      }
    });
  }, [clubId]);

  const storyList = stories
    .slice(0)
    .reverse()
    .map((story) => {
      return (
        <React.Fragment key={story._id}>
          <Col>
            <StoryWrapper>
              <Image src={sampleImg} />
              <Content>{story.content.replace(/\n+/g, '\n')} </Content>
              <Date>{story.date}</Date>
            </StoryWrapper>
          </Col>
        </React.Fragment>
      );
    });

  return (
    <Root>
      {/* TODO: 등록하기 버튼 동아리 관리자에게만 보이도록 수정 */}
      <NewButton onClick={onClickNewButton}>등록하기</NewButton>
      <Row>{storyList}</Row>
    </Root>
  );
};

export default StoryList;
