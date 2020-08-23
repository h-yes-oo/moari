import React, { FC } from 'react';
import styled from 'styled-components';

import logoCampusSvg from 'assets/icons/logo-campus.svg';
import searchSvg from 'assets/icons/search.svg';
import likeSvg from 'assets/icons/like.svg';
import alarmSvg from 'assets/icons/alarm.svg';
import mypageSvg from 'assets/icons/mypage.svg';
import logoutSvg from 'assets/icons/logout.svg';
import tempProfile from 'assets/images/temp-profile.jpg';

const Root = styled.div`
    display: flex;
    align-items: center;
    margin: 36px;
`
const LogoCampusIcon = styled.img`
    cursor: pointer;
`

const SearchBoxWrapper = styled.div`
    width: 48vw;
    height: 32px;
    border: 1px solid #EEEEEE;
    padding: 8px;

    display: flex;
    align-items: center;
    transform: translateX(16px);
`

const SearchIcon = styled.img`
    margin: 4px;
`

const SearchBox = styled.input`
    border: none;
    width: 100%;
    height: 100%;
    &:focus {
        outline: none;
    }

    font-size: 18px;
`

const ProfileWrapper = styled.div`
    width: auto;
    height: 32px;

    display: flex;
    align-items: center;
    transform: translateX(48px)
`

const ProfileName = styled.div`
    font-size: 18px;
`

// need props (profile img)
const ProfileImage = styled.img`
    width: auto;
    height: 100%;
    border-radius: 50%;
`

const ButtonsWrapper = styled.div`
    position: absolute;
    right: 36px;
`

const LikeButton = styled.img`
    margin: 8px;
`

const AlarmButton = styled.img`
    margin: 8px;
`

const MypageButton = styled.img`
    margin: 8px;
` 

const LogoutButton = styled.img`
    margin: 8px;
`

interface Props {
    campusName: string;
    username: string;
}

const Header: FC<Props> = ({ campusName, username }) => {    
    return (
        <Root>
            <LogoCampusIcon src={logoCampusSvg} />
            <SearchBoxWrapper>
                <SearchIcon src={searchSvg} />
                <SearchBox placeholder="동아리 이름이나 태그로 검색해보세요"/>
            </SearchBoxWrapper>
            <ProfileWrapper>
                <ProfileName>{username}님</ProfileName>
                <ProfileImage src={tempProfile} />
            </ProfileWrapper>
            <ButtonsWrapper>
                <LikeButton src={likeSvg} />
                <AlarmButton src={alarmSvg} />
                <MypageButton src={mypageSvg} />
                <LogoutButton src={logoutSvg} />
            </ButtonsWrapper>
        </Root>
    );
}

export default Header;