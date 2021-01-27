import React, { FC, ReactNode, useEffect, useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';

import * as T from 'types';
import { BoldLargeText, TagText } from 'constants/styles';
import BaseLayout from 'components/templates/BaseLayout';
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

const ClubContentsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const ClubImageContainer = styled.div`
    display: flex;
    justify-content: center;
    padding: 72px;
`

const ClubImage = styled.img`
    width: 480px;
    height: auto;
    margin: 24px;
`

const ClubDescription = styled.div`
    border: 1px solid ${palette.primaryViolet.toString()};
    border-radius: 4px;
    padding: 12px;
    width: 1200px;
    text-align: center;
`

interface Props {
    user: AuthResponse;
}

interface ClubInfoRouterProps {
    id: string;
}

const ClubDetailPage: FC<Props & RouteComponentProps<ClubInfoRouterProps>> = ({ match, user }) => {
    const [selectedTab, setSelectedTab] = useState<keyof T.ClubDetailTab>('CLUB_INTRO' as keyof T.ClubDetailTab);
    const [likeImg, setLikeImg] = useState<boolean>(false);
    const [likeCount, setLikeCount] = useState<number>(0);
    //const user = useSelector((state: RootState) => state.userData.data);

    const fetchedData = useSelector((state: RootState) => state.fetchSingle.data);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchClub.request({ id: match.params.id }));
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
        const handleTabClick: (type: keyof T.ClubDetailTab) => void = (type) => {
            setSelectedTab(type);
        };

        const isSelectedTab: (type: keyof T.ClubDetailTab) => boolean = (type) => {
            return selectedTab === type;
        }

        const handleLike: () => void = async () => {
            if(user!.isAuth) {
                dispatch(likeClub.request({ cludId: club._id, userId: user!._id, setLikeImg, likeImg, setLikeCount, likeCount}));
            } else {
                alert('로그인해주세요')
            }
        }

        const menuItems: ReactNode =  
            Object.entries(T.ClubDetailTab).map(([key, value]) => {
                return (
                    <ClubDetailMenuItem 
                        key={key}
                        isSelected={isSelectedTab(key as keyof T.ClubDetailTab)} 
                        onClick={() => handleTabClick(key as keyof T.ClubDetailTab)}
                    >
                    {value}
                    </ClubDetailMenuItem>
                );
            })

        const clubImages: ReactNode =
            club ? club.photos.map((photo,index) => {
                const imageConverterPrefix = "data:image/png;base64,"
                const imageElem = imageConverterPrefix + btoa(String.fromCharCode.apply(null, photo.img.data.data));
                return (
                    <ClubImage key={index} src={imageElem} />
                )
            }) : null;

        return club ? (
            <Root>
                <BoldLargeText>{club.name}</BoldLargeText>
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
                <ClubContentsContainer>
                    <ClubImageContainer>
                        {clubImages}
                    </ClubImageContainer>
                    <ClubDescription>
                        {club ? club.description : null}
                    </ClubDescription>
                </ClubContentsContainer>
            </Root>
        ) : null;
    }
}

export default withRouter(ClubDetailPage);