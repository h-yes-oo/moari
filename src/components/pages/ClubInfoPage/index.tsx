import React, { FC, useEffect } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';

import { BoldText, TagText } from 'constants/styles';
import BaseLayout from 'components/templates/BaseLayout';
import likeSvg from 'assets/icons/like.svg';
import eyesSvg from 'assets/icons/eyes.svg';
import exampleContentPng from 'assets/images/club_explanation_example.png';
import palette from 'constants/palette';

const Root = styled.div`
    margin: 36px 144px;
`

const IconTagWrapper = styled.div`
    display: flex;
    align-items: center;
    margin: 18px 6px;
`

const IconCountWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-right: 16px;
`

const Icon = styled.img`
    width: 28px;
    height: auto;
    margin-right: 4px;
`

const IconCount = styled.div`
    color: ${palette.greyNumber.toString()};
    margin-right: 8px;
`

const TagWrapper = styled.div`
    display: flex;
    transform: translateX(8px);
`

interface ClubInfoMenuProps {
    isSelected?: boolean;
}

const ClubInfoMenuWrapper = styled.div`
    display: flex;
    justify-content: center;
`
const ClubInfoMenuItem = styled.div<ClubInfoMenuProps>(({ isSelected }) => ({
    width: '300px',
    height: '40px',
    fontSize: '20px',
    fontWeight: 'bold',

    color: isSelected ? '#FFFFFF' : palette.primaryGradient.toString(),
    backgroundColor: isSelected ? palette.primaryGradient.toString() : '',
    border: `1px solid ${palette.greyBorder.toString()}`,

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}))

const ClubInfoContent = styled.img`
    transform: translateY(32px);
    width: 100%;
`

interface ClubInfoProps {

}

interface ClubInfoRouterProps {
    id: string;
}

const ClubInfoPage: FC<ClubInfoProps & RouteComponentProps<ClubInfoRouterProps>> = ({ match }) => {
    useEffect(() => {
        console.log(match.params.id);
    }, [match.params]);
    
    return (
        <BaseLayout>
            <Root>
                <BoldText>동아리 이름 들어갈 곳</BoldText>
                <IconTagWrapper>
                    <IconCountWrapper>
                        <Icon src={likeSvg} />
                        <IconCount>48</IconCount>
                        <Icon src={eyesSvg} />
                        <IconCount>1002</IconCount>
                    </IconCountWrapper>
                    <TagWrapper>
                        {/* array.map으로 전환 필요*/}  
                        <TagText>#학회</TagText>
                        <TagText>#생명과학</TagText>
                        <TagText>#화학</TagText>
                        <TagText>#논문읽기</TagText>
                    </TagWrapper>
                </IconTagWrapper>
                <ClubInfoMenuWrapper>
                    {/* array.map으로 전환 필요*/}
                    <ClubInfoMenuItem isSelected={true}>동아리 소개</ClubInfoMenuItem>
                    <ClubInfoMenuItem>모집공고</ClubInfoMenuItem>
                    <ClubInfoMenuItem>동아리 소식</ClubInfoMenuItem>
                    <ClubInfoMenuItem>묻고 답하기</ClubInfoMenuItem>
                </ClubInfoMenuWrapper>
                <ClubInfoContent src={exampleContentPng} />
            </Root>
        </BaseLayout>
    );
}

export default withRouter(ClubInfoPage);