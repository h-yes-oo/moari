import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';

import palette from 'constants/palette';

const Root = styled.div`
    position: fixed;
    width: 100%;
    top: 138px;
    display: flex;
    align-items: center;
    padding: 6px 36px;
    background-color: #ffffff;

    z-index: 100;
`

interface MenuButtonProps {
    isRegister: boolean;
}

const MenuButton = styled.div<MenuButtonProps>(({ isRegister }) => ({
    fontSize: '18px',
    margin: '0 24px',
    color: palette.greyText.toString(),

    position: isRegister ? 'absolute' : undefined,
    right: isRegister ? '72px' : undefined,

    cursor: 'pointer',
}));

interface Props {

}

interface MenuMap {
    [key: string]: string;
} 


const TopMenuBar: FC<Props> = () => {  
    const menuTextList: MenuMap = {
        'home': 'Home',
        'category': '분류별 찾기',
        'tag': '태그로 찾기',
        'status': '모집 상태로 찾기',
        'name': '이름 순 전체보기',
    }

    const registerText: string = '동아리 / 모집공고 등록하기';

    // need a key
    const MenuList: ReactNode = Object.entries(menuTextList).map(([tag, menu]) => (
        // console.log(tag, menu);
        <MenuButton key={tag} isRegister={false}>{menu}</MenuButton>
    ));
    
    return (
        <Root>
            {MenuList}
            <MenuButton isRegister={true}>{registerText}</MenuButton>
        </Root>
    );
}

export default TopMenuBar;