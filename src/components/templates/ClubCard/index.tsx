import React from 'react';
import styled from 'styled-components';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import prepareSvg from 'assets/icons/stat-prepare.svg';
import alwaysSvg from 'assets/icons/stat-always.svg';
import openSvg from 'assets/icons/stat-open.svg';
import closedSvg from 'assets/icons/stat-closed.svg';
import likeEmptySvg from 'assets/icons/like-empty.svg';
import likeFilledSvg from 'assets/icons/like-filled.svg';
import eyesSvg from 'assets/icons/eyes.svg';
import palette from 'constants/palette';
import * as T from 'types';

const Root = styled.div<{ image?: string | undefined }>`
  width: 358px;
  height: 512px;
  border-radius: 20px;
  background-color: #eeeeee;
  position: relative;
  cursor: pointer;
  margin: 0 72px;
  flex-shrink: 0;
  box-shadow: 10px 40px 50px rgba(229, 233, 246, 0.4);
`;

const CardImage = styled.img`
  object-fit: cover;
  position: absolute;
  top: 0;
  width: 100%;
  height: 50%;
  border-radius: 20px 20px 0 0;
  cursor: pointer;
`;

const CardDescription = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 50%;
  border-radius: 0 0 20px 20px;
  padding: 25px 30px;
  box-sizing: border-box;
  cursor: pointer;
`;

const StatusLabel = styled.img`
  width: 108px;
  height: auto;
  position: absolute;
  left: -12px;
  top: 16px;
`;

const ClubNameText = styled.div`
  font-size: 21px;
  font-weight: bold;
`;

const ClubDescription = styled.div`
  margin-top: 10px;
  line-height: 1.6;
`;

const ClubInfo = styled.div`
  margin-top: 5px;
  display: flex;
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  align-items: center;
  text-align: center;
  color: ${palette.dark50.toString()};
`;
const HeartImg = styled.img`
  margin-left: -1px;
  margin-right: 6px;
  width: 24px;
  height: 20px;
`;

const EyeImg = styled.img`
  margin-left: 10px;
  margin-right: 5px;
  margin-bottom: 2px;
  width: 25px;
  height: 25px;
`;
interface Props {
  key: string;
  id: string;
  name: string;
  description: string;
  image?: any; // TODO: type
  status: T.Status;
  category?: T.Category;
  tags?: string[];
  likes: number;
  views: number;
  liked: boolean | undefined;
}

const ClubCard = ({
  id,
  name,
  description,
  image,
  status,
  likes,
  views,
  history,
  liked,
}: Props & RouteComponentProps) => {
  const bufferArray = image ? image.img.data.data : '';
  const base64prefix = 'data:image/png;base64,';
  const imageSource = image ? base64prefix + btoa(new TextDecoder('utf-16').decode(new Uint16Array(bufferArray))) : '';

  const goClubDetail: (id: string) => void = (id) => {
    history.push(`/club/${id}`);
  };

  // TODO: switch-case refactoring
  return (
    <Root id="clubcard-root" onClick={() => goClubDetail(id)}>
      <CardImage src={imageSource} />
      {(() => {
        switch (status) {
          case T.Status.PREPARE:
            return <StatusLabel src={prepareSvg} />;
          case T.Status.ALWAYS:
            return <StatusLabel src={alwaysSvg} />;
          case T.Status.OPEN:
            return <StatusLabel src={openSvg} />;
          case T.Status.CLOSED:
            return <StatusLabel src={closedSvg} />;
          default:
            return null;
        }
      })()}
      <CardDescription>
        <ClubNameText>{name}</ClubNameText>
        <ClubInfo>
          <HeartImg src={liked ? likeFilledSvg : likeEmptySvg} /> {likes}
          <EyeImg src={eyesSvg} /> {views}
        </ClubInfo>
        <ClubDescription>{description}</ClubDescription>
      </CardDescription>
    </Root>
  );
};

export default withRouter(ClubCard);
