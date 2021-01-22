import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import logoCampusSvg from 'assets/icons/logo-campus.svg';
import searchSvg from 'assets/icons/search.svg';
import likeSvg from 'assets/icons/like-empty.svg';
import alarmSvg from 'assets/icons/alarm.svg';
import mypageSvg from 'assets/icons/mypage.svg';
import signupSvg from 'assets/icons/signup.svg';
import loginSvg from 'assets/icons/login.svg';
import logoutSvg from 'assets/icons/logout.svg';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'modules/index';
import { searchClub } from 'modules/clubList';
import { logoutUser } from 'modules/logout/actions';
import { AuthResponse } from 'api/auth';

const Root = styled.div`
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    background-color: #ffffff;

    display: flex;
    align-items: center;
    z-index: 100;
    padding: 36px;
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
    cursor: pointer;
`

const SearchBox = styled.input`
    padding-left: 12px;
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
    transform: translateX(36px);
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
    right: 48px
`

const HeaderButton = styled.img`
    margin: 8px;
    cursor: pointer;
`

interface Props {
    campusName: string;
    user: AuthResponse;
}

const Header: FC<Props & RouteComponentProps> = ({ campusName, history, user }) => {    
    const dispatch = useDispatch();
    const [searchKeyword, setSearchKeyword] = useState<string>("");
    
    //const userData = useSelector((state: RootState) => state.userData.data);
    const isAuth = user.isAuth;
    const name = user.name;
    const userImage = user.image;

    const goMainPage: () => void = () => {
        history.push('/');
    }

    const goSignup: () => void = () => {
        history.push('/signup');
    }
    
    const goLogin: () => void = () => {
        history.push('/login');
    }

    const goSearchResult: () => void = () => {
        history.push(`/search/${searchKeyword}`);
    }

    const clickSearch: () => void = () => {
        if (searchKeyword === "") alert("검색어를 입력해주세요");
        console.log(searchKeyword);
        setSearchKeyword("");
        dispatch(searchClub.request({ keyword: searchKeyword }));
        goSearchResult();
    }

    const logout: () => void = () => {
        dispatch(logoutUser.request({ history }));
    }

    // 마지막 한 글자가 한번 더 쳐짐 ㅠㅠ
    const enterSearch: (e: React.KeyboardEvent<HTMLInputElement>) => void = (e) => {
        if (e.key === "Enter") {
            if (searchKeyword === "") {
                alert("검색어를 입력해주세요");        
                return;
            }
            console.log(searchKeyword);
            setSearchKeyword("");
            dispatch(searchClub.request({ keyword: searchKeyword }));
            goSearchResult();
        }
    }

    return (
        <Root>
            <LogoCampusIcon src={logoCampusSvg} onClick={() => goMainPage()}/>
            <SearchBoxWrapper>
                <SearchIcon
                    id="search-icon"
                    src={searchSvg}
                    onClick={() => clickSearch()}
                />
                <SearchBox
                    id="search-box"
                    placeholder="동아리 이름이나 태그로 검색해보세요"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    onKeyPress={(e) => enterSearch(e)}
                />
            </SearchBoxWrapper>
            { isAuth &&
            <ProfileWrapper>
                <ProfileName>{name}님</ProfileName>
                <ProfileImage src={userImage} />
            </ProfileWrapper>
            }
            <ButtonsWrapper>
                { isAuth && <HeaderButton src={likeSvg} /> }
                { isAuth && <HeaderButton src={alarmSvg} /> }
                {/* <HeaderButton src={mypageSvg} />
                <HeaderButton src={logoutSvg} /> */}
                {/* else */}
                { !isAuth && <HeaderButton src={signupSvg} onClick={() => goSignup()} />}
                { !isAuth && <HeaderButton src={loginSvg} onClick={() => goLogin()} />}
                { isAuth && <HeaderButton src={mypageSvg} onClick={() => logout()} /> }
                { isAuth && <HeaderButton src={logoutSvg} onClick={() => logout()} /> }
            </ButtonsWrapper>
        </Root>
    );
}

export default withRouter(Header);
