import React, { FC, ReactNode, useState, useRef, RefObject, MutableRefObject, useEffect } from 'react';
import styled from 'styled-components';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import palette from 'constants/palette';
import { searchClub } from 'actions/club';
import UnfoldTopMenu from '../UnfoldTopMenu';

const Root = styled.div`
  
`

const MenuContainer = styled.div`
    position: fixed;
    width: 100%;
    top: 138px;
    display: flex;
    align-items: center;
    background-color: #ffffff;

    z-index: 100;
    padding: 10px 36px;
`

const MenuButton = styled.div<{ isRegisterButton?: boolean }>`
    font-size: 18px;
    padding: 0 24px;
    color: ${palette.greyText.toString()};
    box-sizing: border-box;
    padding-bottom: 4px;
    
    &:hover {
        color: ${palette.primaryViolet.toString()};
        border-bottom: 4px solid ${palette.primaryViolet.toString()};
    }
    
    position: ${(props) => !props.isRegisterButton ? undefined : `absolute`};
    right: ${(props) => !props.isRegisterButton ? undefined : `72px`};

    cursor: pointer;
`

interface Props {

}

interface MenuMap {
    [key: string]: string;
} 

const TopMenuBar: FC<Props & RouteComponentProps> = ({ history }) => {  
    const [showUnfoldMenu, setShowUnfoldMenu] = useState<Boolean>(false);
    const [menuLoaded, setMenuLoaded] = useState<boolean>(false);

    const homeRef = useRef<HTMLDivElement>(null);
    const categoryRef = useRef<HTMLDivElement>(null);
    const tagRef = useRef<HTMLDivElement>(null);
    const statusRef = useRef<HTMLDivElement>(null);

    const menuTextList: MenuMap = {
        'home': 'Home',
        'category': '분류별 찾기',
        'tag': '태그로 찾기',
        'status': '모집 상태로 찾기',
        'name': '이름 순 전체보기',
    }

    const registerText: string = '동아리 / 모집공고 등록하기';

    const goRegister: () => void = () => {
        history.push('/register/club');
    };

    const goFindPage: (key: string) => void = (tag) => {
        // console.log(tag);
    }

    const isAllRefLoaded: boolean = homeRef && categoryRef && tagRef && statusRef ? true : false;

    useEffect(() => {
        setMenuLoaded(true);
        // console.log("isAllRefLoaded: " + isAllRefLoaded);
    }, [isAllRefLoaded])

    const MenuList: ReactNode = Object.entries(menuTextList).map(([key, menu]) => (
        <MenuButton
            key={key}
            isRegisterButton={false}
            onClick={() => goFindPage(key)}
            onMouseEnter={() => setShowUnfoldMenu(true)}
            onMouseLeave={() => setShowUnfoldMenu(false)}
            // too bad !!!
            ref={key === 'home' ? homeRef : key === 'category' ? categoryRef : key === 'tag' ? tagRef : key === 'status' ? statusRef : null}
        >
            {menu}
        </MenuButton>
    ));

    const unfoldTopMenu: ReactNode = showUnfoldMenu && menuLoaded ?
     <UnfoldTopMenu
        homeWidth={homeRef.current?.clientWidth}
        categoryWidth={categoryRef.current?.clientWidth}
        tagWidth={tagRef.current?.clientWidth}
        statusWidth={statusRef.current?.clientWidth}
        setShowUnfoldMenu={setShowUnfoldMenu}
    /> : null;
    
    return (
        <Root>
            <MenuContainer>
                {MenuList}
                <MenuButton isRegisterButton={true} onClick={() => goRegister()}>
                    {registerText}
                </MenuButton>
            </MenuContainer>
            {unfoldTopMenu}
        </Root>
    );
}

export default withRouter(TopMenuBar);
