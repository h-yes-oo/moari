import React, { FC } from 'react';
import styled from 'styled-components';

import logoSvg from 'assets/icons/footer-logo.svg';
import palette from 'constants/palette';

const Root = styled.div`
    border-top: 1px solid ${palette.greyNumber.toString()};
    padding: 20px;
    margin-top: 72px;
    height: 60px;
    display: flex;
    position: relative;
`

const FooterLogo = styled.img`
    margin-left: 24px;
`

const MoariText = styled.div`
    font-family: Montserrat;
    font-style: normal;
    font-weight: normal;
    font-size: 17px;
    line-height: 24px;
    color: rgba(31, 32, 65, 0.75);
    margin-left: 26px;
    display: flex;
    align-items: center;
`

const CopyrightText = styled.div`

    font-family: Montserrat;
    font-style: normal;
    font-weight: normal;
    font-size: 17px;
    line-height: 20px;
    margin-right: 32px;

    color: rgba(31, 32, 65, 0.75);
`

const ContactText = styled.a`
    margin-right: 30px;

    font-family: Montserrat;
    font-style: normal;
    font-weight: normal;
    font-size: 17px;
    line-height: 20px;

    display: flex;
    align-items: center;
    color: rgba(31, 32, 65, 0.5);
`

const PrivacyPolicy = styled.a`
    margin-right: 30px;

    font-family: Montserrat;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 20px;

    display: flex;
    align-items: center;
    color: rgba(31, 32, 65, 0.5);
`

const Wrapper = styled.div`
    position: absolute;
    right: 2%;
    bottom: 30%;
    display: flex;
    align-items: center;
`

interface Props {

}

const Footer: FC<Props> = () => {
    return (
        <Root>
            <FooterLogo src={logoSvg} />
            <MoariText>
                모여라 세상 모든 동아리 <br />
                모든 대학생의 즐거운 동아리 활동을 응원합니다
            </MoariText>
            <Wrapper>
                <ContactText>
                    문의하기
                </ContactText>
                <PrivacyPolicy>
                    개인정보처리방침
                </PrivacyPolicy>
                <CopyrightText>
                    Copyright © 2021 Moari. All rights reserved. 
                </CopyrightText>
            </Wrapper>
        </Root>
    );
}

export default Footer;