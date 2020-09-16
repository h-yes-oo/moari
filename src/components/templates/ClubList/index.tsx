import React, { FC, ReactNode, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import * as T from 'types';
import ClubCard from 'components/templates/ClubCard';
import leftArrowSvg from 'assets/icons/left-arrow.svg';
import rightArrowSvg from 'assets/icons/right-arrow.svg';
import { RootState } from 'reducers';
import { getClubList } from 'actions/club';

const Root = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 0 24px;
` 

const ArrowButton = styled.img`
    text-align: center;
`

interface Props {

}

interface ClubData {
    [key: number]: T.ClubInfo; // key refers to id
}

export const mockClubData: ClubData = {
    0: {
        id: 1,
        name: '멋쟁이사자처럼',
        description: '멋쟁이 사자처럼은 내 손으로 내 아이디어를 구현하자! 라는 목표로 만들어진 창업 및 개발 동아리입니다.',
        image: 'likelion',
        status: T.ClubStatus.PREPARE,
        tags: ['코딩', '창업', '개발', '연합'],
    },
    1: {
        id: 2,
        name: '공대 야구부',
        description: '- 스누리그, 총장배 구기대회, 종합체육대회 등 매년 3~4개 이상 대회에 참가🏆 - 매주 목요일 저녁, 토요일 아침 정기연습⚾️...',
        image: 'eng baseball',
        status: T.ClubStatus.ALWAYS,
        tags: ['스포츠', '공대', '친목'],
    },
    2: {
        id: 3,
        name: 'SNU-BIZ 드림멘토링',
        description: '드림멘토링은 DB재단의 지원을 받아 다양한 취약 계층의 청소년을 멘토링하며 멘토와 멘티의 상호 성장을 도모하는 교육 봉사 동아리로, ...',
        image: 'snu-biz dream mentoring',
        status: T.ClubStatus.OPEN,
        tags: ['봉사', '멘토링'],
    },
}

const ClubList: FC<Props> = () => {    
    const clubs = useSelector((state: RootState) => state.club);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getClubList()); 
    }, []);

    useEffect(() => {
        console.log(clubs);
    }, [clubs]);
    
    const mockClubList: ReactNode = Object.entries(mockClubData).map(([id, club]) => (
        <ClubCard
            id={club.id}
            name={club.name}
            description={club.description}
            image={club.image}
            status={club.status}
            tags={club.tags}
        />
    ));

    return (
        <Root>
            <ArrowButton src={leftArrowSvg} />
                {mockClubList}
            <ArrowButton src={rightArrowSvg} />
        </Root>
    );
}

export default ClubList;
