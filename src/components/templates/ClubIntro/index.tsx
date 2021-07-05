import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';

import Club from 'types';
import palette from 'constants/palette';

const ClubContentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ClubImageContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 72px;
`;

const ClubImage = styled.img`
  width: 480px;
  height: auto;
  margin: 24px;
`;

const ClubDescription = styled.div`
  border: 1px solid ${palette.primaryViolet.toString()};
  border-radius: 4px;
  padding: 12px;
  width: 1200px;
  text-align: center;
`;

interface ClubIntroProps {
  club: Club;
}

const ClubIntro: FC<ClubIntroProps> = ({ club }) => {
  const clubImages: ReactNode = club.photos.map((photo, index) => {
    const bufferArray = photo ? photo.img.data.data : '';
    const base64prefix = 'data:image/png;base64,';
    const imageSource = photo
      ? base64prefix + btoa(new TextDecoder('utf-16').decode(new Uint16Array(bufferArray)))
      : '';

    return <ClubImage key={index} src={imageSource} />;
  });
  return (
    <ClubContentsContainer>
      <ClubImageContainer>{clubImages}</ClubImageContainer>
      <ClubDescription>{club ? club.description : null}</ClubDescription>
    </ClubContentsContainer>
  );
};

export default ClubIntro;
