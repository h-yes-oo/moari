import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';
<<<<<<< HEAD
=======
import { withRouter, RouteComponentProps } from 'react-router-dom';
>>>>>>> 05f8d9fc71c3cf0b0dca6901a732ec35404472e5

import palette from 'constants/palette';

const Root = styled.div`
<<<<<<< HEAD
    display: flex;
    align-items: center;
    margin-left: 36px;
=======
    position: fixed;
    width: 100%;
    top: 138px;
    display: flex;
    align-items: center;
    padding: 6px 36px;
    background-color: #ffffff;

    z-index: 100;
>>>>>>> 05f8d9fc71c3cf0b0dca6901a732ec35404472e5
`

interface MenuButtonProps {
    isRegister: boolean;
}

const MenuButton = styled.div<MenuButtonProps>(({ isRegister }) => ({
    fontSize: '18px',
    margin: '0 24px',
    color: palette.greyText.toString(),

    position: isRegister ? 'absolute' : undefined,
<<<<<<< HEAD
    right: isRegister ? '36px' : undefined,
=======
    right: isRegister ? '72px' : undefined,
>>>>>>> 05f8d9fc71c3cf0b0dca6901a732ec35404472e5

    cursor: 'pointer',
}));

interface Props {

}

interface MenuMap {
    [key: string]: string;
} 


<<<<<<< HEAD
const TopMenuBar: FC<Props> = () => {  
=======
const TopMenuBar: FC<Props & RouteComponentProps> = ({ history }) => {  
>>>>>>> 05f8d9fc71c3cf0b0dca6901a732ec35404472e5
    const menuTextList: MenuMap = {
        'home': 'Home',
        'category': '분류별 찾기',
        'tag': '태그로 찾기',
        'status': '모집 상태로 찾기',
        'name': '이름 순 전체보기',
    }

    const registerText: string = '동아리 / 모집공고 등록하기';

<<<<<<< HEAD
=======
    const goRegister: () => void = () => {
        history.push('/register');
    };

>>>>>>> 05f8d9fc71c3cf0b0dca6901a732ec35404472e5
    // need a key
    const MenuList: ReactNode = Object.entries(menuTextList).map(([tag, menu]) => (
        // console.log(tag, menu);
        <MenuButton key={tag} isRegister={false}>{menu}</MenuButton>
    ));
    
    return (
        <Root>
            {MenuList}
<<<<<<< HEAD
            <MenuButton isRegister={true}>{registerText}</MenuButton>
=======
            <MenuButton isRegister={true} onClick={() => goRegister()}>
                {registerText}
            </MenuButton>
>>>>>>> 05f8d9fc71c3cf0b0dca6901a732ec35404472e5
        </Root>
    );
}

<<<<<<< HEAD
export default TopMenuBar;
=======
export default withRouter(TopMenuBar);
>>>>>>> 05f8d9fc71c3cf0b0dca6901a732ec35404472e5
