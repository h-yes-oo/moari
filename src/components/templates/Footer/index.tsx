import React, { FC } from 'react';
import styled from 'styled-components';

import logoSvg from 'assets/icons/footer-logo.svg';
import palette from 'constants/palette';

const Root = styled.div`
    border-top: 1px solid ${palette.greyNumber.toString()};

    padding: 20px;
    margin-top: 72px;
`

const FooterLogo = styled.img`
    margin-left: 24px;
`

interface Props {

}

const Footer: FC<Props> = ({ }) => {
    return (
        <Root>
            <FooterLogo src={logoSvg} />
        </Root>
    );
}

export default Footer;