import React, { ReactNode, useEffect, useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { BoldLargeText, TagText } from 'constants/styles';
import palette from 'constants/palette';
import likeEmptySvg from 'assets/icons/like-empty.svg';
import likeFilledSvg from 'assets/icons/like-filled.svg';
import eyesSvg from 'assets/icons/eyes.svg';
import { AuthResponse } from 'api/auth';
import { RootState } from 'modules/index';
import { fetchClub } from 'modules/fetchSingle';
import { likeClub } from 'modules/userData';
import Loading from '../../templates/Loading';
import CommentList from '../../templates/CommentList';
import StoryList from 'components/templates/StoryList';
import ClubIntro from 'components/templates/ClubIntro';
import * as T from 'types';

const Root = styled.div`
  margin: 36px 144px;
`;

const IconTagWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 18px 6px;
`;

const IconCountWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 16px;
`;

const Icon = styled.img`
  width: 28px;
  height: auto;
  margin-right: 4px;
  cursor: pointer;
`;

const IconCount = styled.div`
  color: ${palette.greyNumber.toString()};
  margin-right: 8px;
`;

const TagWrapper = styled.div`
  display: flex;
  transform: translateX(8px);
`;

interface ClubInfoMenuProps {
  isSelected?: boolean;
}

const ClubDetailMenuWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const ClubDetailMenuItem = styled.div<ClubInfoMenuProps>(({ isSelected }) => ({
  marginLeft: '50px',

  fontSize: '20px',
  fontFamily: 'Montserrat',
  fontStyle: 'normal',
  fontWeight: 'bold',
  lineHeight: '24px',

  display: 'flex',
  alignItems: 'center',
  textAlign: 'center',

  color: isSelected ? palette.primaryGradient.toString() : palette.dark50.toString(),
  cursor: 'pointer',
}));

const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

interface Props {
  user: AuthResponse;
}

interface ClubInfoRouterProps {
  id: string;
  tab: string;
}

const ClubDetailPage = ({ match, user, history }: Props & RouteComponentProps<ClubInfoRouterProps>) => {
  const [selectedTab, setSelectedTab] = useState<T.TabItem>(
    match.params.tab === 'story'
      ? ('STORY' as T.TabItem)
      : match.params.tab === 'qna'
      ? ('QNA' as T.TabItem)
      : match.params.tab === 'recruitment'
      ? ('RECRUIT_NOTICE' as T.TabItem)
      : ('CLUB_INTRO' as T.TabItem)
  );
  const [likeImg, setLikeImg] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(0);

  const fetchedData = useSelector((state: RootState) => state.fetchSingle.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchClub.request({ id: match.params.id }));
    console.log(match.params.tab);
  }, [dispatch, match.params.id, match.params.tab]);

  useEffect(() => {
    if (fetchedData && user) {
      const club = fetchedData!.club;
      if (user.likedClubs && user.likedClubs.some((cid) => cid === club._id)) {
        setLikeImg(true);
      } else setLikeImg(false);
      setLikeCount(club.likedUsers.length);
    }
  }, [user, fetchedData]);

  if (fetchedData === null || user === null) {
    return <Loading />;
  }

  const handleTabClick: (type: keyof typeof T.ClubDetailTab, path: string) => void = (type, path) => {
    setSelectedTab(type);
    history.push(`/club/${club._id}${path}`);
  };

  const isSelectedTab: (type: T.TabItem) => boolean = (type) => {
    return selectedTab === type;
  };

  const handleLike: () => void = async () => {
    if (user!.isAuth) {
      dispatch(likeClub.request({ cludId: club._id, userId: user!._id, setLikeImg, likeImg, setLikeCount, likeCount }));
    } else {
      alert('로그인해주세요');
    }
  };

  const club = fetchedData!.club;

  const menuItems: ReactNode = Object.entries(T.ClubDetailTab).map(([key, value]) => {
    return (
      <ClubDetailMenuItem
        key={key}
        isSelected={isSelectedTab(key as T.TabItem)}
        onClick={() => handleTabClick(key as T.TabItem, value.path)}
      >
        {value.name}
      </ClubDetailMenuItem>
    );
  });

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
            {/* TODO: array.map으로 변경*/}
            <TagText>#학회</TagText>
            <TagText>#생명과학</TagText>
            <TagText>#화학</TagText>
            <TagText>#논문읽기</TagText>
          </TagWrapper>
        </IconTagWrapper>
        <ClubDetailMenuWrapper>{menuItems}</ClubDetailMenuWrapper>
      </TopWrapper>
      {selectedTab === ('CLUB_INTRO' as T.TabItem) && <ClubIntro club={club} />}
      {selectedTab === ('QNA' as T.TabItem) && <CommentList user={user} clubId={club._id} />}
      {selectedTab === ('STORY' as T.TabItem) && <StoryList clubId={club._id} />}
    </Root>
  ) : null;
};

export default withRouter(ClubDetailPage);
