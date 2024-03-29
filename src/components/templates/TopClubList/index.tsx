import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import ClubCard from 'components/templates/ClubCard';
import leftArrowSvg from 'assets/icons/left-arrow.svg';
import rightArrowSvg from 'assets/icons/right-arrow.svg';
import { RootState } from 'modules/index';
import { AuthResponse } from 'api/auth';

const Root = styled.div`
  display: flex;
  padding: 0 24px;
  margin-bottom: 72px;
`;

const ArrowButton = styled.img`
  text-align: center;
  cursor: pointer;
`;

const ClubListContainer = styled.div`
  overflow-x: hidden;
  margin: 0 36px;
`;

const SliderContainer = styled.div<{ currentSlide: number }>`
  margin-left: calc(42px * ${(props) => props.currentSlide + 1});
  display: flex;
`;

interface Props {
  user: AuthResponse;
}

const TopClubList = ({ user }: Props) => {
  const fetchedData = useSelector((state: RootState) => state.clubList.data);

  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const clubs = fetchedData !== null ? fetchedData!.clubs : [];
  const TOTAL_SLIDES: number = Math.floor((clubs.length - 1) / 3);

  const slideRef = useRef(document.createElement('div'));

  const nextSlide = () => {
    console.log('next slide');
    if (currentSlide >= TOTAL_SLIDES) setCurrentSlide(0);
    else setCurrentSlide(currentSlide + 1);
  };

  const prevSlide = () => {
    console.log('prev slide');
    if (currentSlide === 0) setCurrentSlide(TOTAL_SLIDES);
    else setCurrentSlide(currentSlide - 1);
  };

  useEffect(() => {
    slideRef.current.style.transition = 'all 0.5s ease-in-out';
    slideRef.current.style.transform = `translateX(-${currentSlide}00%)`;
  }, [currentSlide]);

  const clubList: ReactNode = clubs.map((club) => {
    return (
      <ClubCard
        key={club._id}
        id={club._id}
        name={club.name}
        description={club.description}
        image={club.photos ? club.photos[0] : undefined}
        status={club.status}
        likes={club.likedUsers.length}
        views={club.views}
        liked={user?.likedClubs?.includes(club._id)}
      />
    );
  });

  return (
    <Root>
      <ArrowButton src={leftArrowSvg} onClick={prevSlide} />
      <ClubListContainer>
        <SliderContainer ref={slideRef} currentSlide={currentSlide}>
          {clubList}
        </SliderContainer>
      </ClubListContainer>
      <ArrowButton src={rightArrowSvg} onClick={nextSlide} />
    </Root>
  );
};

export default TopClubList;
