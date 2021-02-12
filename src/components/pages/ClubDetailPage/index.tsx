import React, { FC, ReactNode, useEffect, useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import styled, { css } from 'styled-components';

import * as T from 'types';
import { BoldLargeText, TagText } from 'constants/styles';
import likeEmptySvg from 'assets/icons/like-empty.svg';
import likeFilledSvg from 'assets/icons/like-filled.svg';
import eyesSvg from 'assets/icons/eyes.svg';
import palette from 'constants/palette';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'modules/index';
import { fetchClub } from 'modules/fetchSingle';
import Loading from '../../templates/Loading';
import { likeClub } from 'modules/userData';
import { AuthResponse } from 'api/auth';
import CommentList from '../../templates/CommentList';
import StoryList from 'components/templates/StoryList';
import ClubIntro from 'components/templates/ClubIntro';

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
    cursor: pointer;
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

const ClubDetailMenuItem = styled.div<ClubInfoMenuProps>`
    margin-left: 50px;

    font-size: 20px;
    font-family: Montserrat;
    font-style: normal;
    font-weight: bold;
    line-height: 24px;

    display: flex;
    align-items: center;
    text-align: center;
    color: ${palette.dark50.toString()};

    background: ${props => props.isSelected && css`-webkit-linear-gradient(90deg, #BC9CFF 0%, #8BA4F9 100%)`};
    -webkit-background-clip: ${props => props.isSelected && css`text`};
    -webkit-text-fill-color: ${props => props.isSelected && css`transparent`};
    
    cursor: pointer;
`

const TopWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    min-width: 1000px;
`

interface Props {
    user: AuthResponse;
}

interface ClubInfoRouterProps {
    id: string;
    tab: string
}

const ClubDetailPage: FC<Props & RouteComponentProps<ClubInfoRouterProps>> = ({ match, user, history }) => {
    const [selectedTab, setSelectedTab] = useState<T.TabItem>(
        match.params.tab === 'story' ? 'STORY' as T.TabItem : 
        match.params.tab === 'qna'? 'QNA' as T.TabItem : 
        match.params.tab === 'recruitment'? 'RECRUIT_NOTICE' as T.TabItem : 
        'CLUB_INTRO' as T.TabItem
        );
    const [likeImg, setLikeImg] = useState<boolean>(false);
    const [likeCount, setLikeCount] = useState<number>(0);

    const fetchedData = useSelector((state: RootState) => state.fetchSingle.data);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchClub.request({ id: match.params.id }));
        console.log(match.params.tab)
    }, [match.params.id]);
    
    useEffect(() => {
        if(fetchedData && user) {
            const club = fetchedData!.club;
            if (user.likedClubs && user.likedClubs.some(cid => cid === club._id)) {
                setLikeImg(true);
            }
            else setLikeImg(false);
            setLikeCount(club.likedUsers.length);
        }
    }, [user, fetchedData])

    if (fetchedData === null || user === null) {
        return <Loading />
    } else {
        const club = fetchedData!.club;
        const handleTabClick: (type: keyof typeof  T.ClubDetailTab, path: string) => void = (type, path) => {
            setSelectedTab(type);
            history.push(`/club/${club._id}${path}`)
        };

        const isSelectedTab: (type: T.TabItem) => boolean = (type) => {
            return selectedTab === type;
        }


        const handleLike: () => void = async () => {
            if(user!.isAuth) {
                dispatch(likeClub.request({ cludId: club._id, userId: user._id, setLikeImg, likeImg, setLikeCount, likeCount}));
            } else {
                alert('로그인해주세요')
            }
        }

        const menuItems: ReactNode =  
            Object.entries(T.ClubDetailTab).map(([key, value]) => {
                return (
                    <ClubDetailMenuItem 
                        key={key}
                        isSelected={isSelectedTab(key as T.TabItem)} 
                        onClick={() => handleTabClick(key as T.TabItem, value.path) }
                    >
                        {value.name}
                    </ClubDetailMenuItem>
                );
            })

        return club ? (
            <Root>
                <BoldLargeText>{club.name}</BoldLargeText>
                <TopWrapper>
                    <IconTagWrapper>
                        <IconCountWrapper>
                            <Icon src={likeImg ? likeFilledSvg : likeEmptySvg} onClick={() => handleLike()} />
                            <IconCount>{likeCount}</IconCount>
                            <Icon src={eyesSvg} />
                            <IconCount>{club.views}</IconCount>
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
                </TopWrapper>
                { selectedTab === 'CLUB_INTRO' as T.TabItem &&
                    <ClubIntro club={club}/>
                }
                { selectedTab === 'STORY' as T.TabItem &&
                    <StoryList clubId={club._id}/>
                }
                { selectedTab === 'QNA' as T.TabItem &&
                    <CommentList user={user} clubId={club._id}/>
                }
            </Root>
        ) : null;
    }
}

export default withRouter(ClubDetailPage);