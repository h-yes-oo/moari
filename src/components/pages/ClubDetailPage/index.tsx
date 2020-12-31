import React, { FC, ReactNode, useEffect, useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';

import * as T from 'types';
import { BoldLargeText, TagText } from 'constants/styles';
import BaseLayout from 'components/templates/BaseLayout';
import RecruitNotice from 'components/templates/RecruitNotice';
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

const ClubDetailMenuWrapper = styled.div`
    display: flex;
    justify-content: center;
`
const ClubDetailMenuItem = styled.div<ClubInfoMenuProps>(({ isSelected }) => ({
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

    cursor: 'pointer',
}))

const ClubInfoContent = styled.img`
    transform: translateY(32px);
    width: 100%;
`

interface Props {

}

interface ClubInfoRouterProps {
    id: string;
}

const ClubDetailPage: FC<Props & RouteComponentProps<ClubInfoRouterProps>> = ({ match }) => {
    const [selectedTab, setSelectedTab] = useState<keyof T.ClubDetailTab>('CLUB_INTRO' as keyof T.ClubDetailTab);

    useEffect(() => {
        console.log(match.params.id);
    }, [match.params]);


    const handleTabClick: (type: keyof T.ClubDetailTab) => void = (type) => {
        setSelectedTab(type);
    };

    const isSelectedTab: (type: keyof T.ClubDetailTab) => boolean = (type) => {
        return selectedTab === type;
    }

    const menuItems: ReactNode =  
        Object.entries(T.ClubDetailTab).map(([key, value]) => {
            return (
                <ClubDetailMenuItem 
                    isSelected={isSelectedTab(key as keyof T.ClubDetailTab)} 
                    onClick={() => handleTabClick(key as keyof T.ClubDetailTab)}
                >
                {value}
                </ClubDetailMenuItem>
            );
        })

    return (
        <BaseLayout>
            <Root>
                <BoldLargeText>동아리 이름 들어갈 곳</BoldLargeText>
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
                <ClubDetailMenuWrapper>
                    {menuItems}
                </ClubDetailMenuWrapper>
                <ClubInfoContent src={exampleContentPng} />
            </Root>
        </BaseLayout>
    );
}

export default withRouter(ClubDetailPage);