import React, { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import * as T from 'types';
import ClubCard from 'components/templates/ClubCard';
import leftArrowSvg from 'assets/icons/left-arrow.svg';
import rightArrowSvg from 'assets/icons/right-arrow.svg';
import { RootState } from 'reducers';
import { fetchClubList } from 'actions/club';

const Root = styled.div`
    display: flex;
    padding: 0 24px;
` 

const ArrowButton = styled.img`
    text-align: center;
    cursor: pointer;
`

const ClubListWrapper = styled.div`
    display: flex;
    // justify-content: space-around;
    overflow-x: hidden;
    margin: 0 36px;
`

interface Props {

}

interface ClubData {
    [key: number]: T.ClubInfo; // key refers to id
}


const ClubList: FC<Props> = () => {    
    const clubs = useSelector((state: RootState) => state.club);
    const dispatch = useDispatch();
    
    const TOTAL_SLIDES: number = (clubs.clubs.length - 1) / 3 + 1;

    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const slideRef = useRef(null);

    const nextSlide = () => {
        if (currentSlide >= TOTAL_SLIDES) setCurrentSlide(0);
        else setCurrentSlide(currentSlide + 1);
    };

    const prevSlide = () => {
        if (currentSlide === 0)  setCurrentSlide(TOTAL_SLIDES);
        else setCurrentSlide(currentSlide - 1);
    };

    useEffect(() => {
        dispatch(fetchClubList.request()); 
    }, []);

    useEffect(() => {
        // if (slideRef === null) return;
        console.log(slideRef.current);
        // slideRef.current.style.transition = "all 0.5s ease-in-out";
        // slideRef.current.style.transform = `translateX(-${currentSlide}00%)`;
      }, [currentSlide]);

    const topClubList: ReactNode = clubs.clubs.map((club) => (
        <ClubCard
            key={club._id}
            name={club.name}
            description={club.description}
        />
    ));

    return (
        <Root>
            <ArrowButton src={leftArrowSvg} onClick={prevSlide} />
                <ClubListWrapper ref={slideRef}>
                    {topClubList}
                </ClubListWrapper>
            <ArrowButton src={rightArrowSvg} onClick={nextSlide} />
        </Root>
    );
}

export default ClubList;
