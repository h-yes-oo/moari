import React, { FC, ReactNode, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { ProposeClubText } from 'components/templates/SimpleText';
import TopClubList from 'components/templates/TopClubList';
import ClubList from 'components/templates/ClubList';
import { fetchClubsAll, searchClub } from 'modules/clubList';
import { RootState } from 'modules/index';
import Loading from 'components/templates/Loading';
import { AuthResponse } from 'api/auth';

interface Props {
  user: AuthResponse;
}

interface MatchParams {
  keyword: string;
  category: string;
  tag: string;
  status: string;
}

const MainPage: FC<Props & RouteComponentProps<MatchParams>> = ({ match, user }) => {
  const dispatch = useDispatch();

  const isFilteredPage: boolean = Object.keys(match.params).length > 0;
  const topClubList: ReactNode = isFilteredPage ? null : <TopClubList user={user} />;
  const proposeClubText: ReactNode = isFilteredPage ? null : <ProposeClubText />;

  const fetchedData = useSelector((state: RootState) => state.clubList.data);

  useEffect(() => {
    if (isFilteredPage) dispatch(searchClub.request({ keyword: match.params.keyword }));
    else dispatch(fetchClubsAll.request());
  }, [dispatch, isFilteredPage, match.params.keyword]);

  if (!fetchedData) {
    return <Loading />;
  }
  return (
    <>
      {proposeClubText}
      {topClubList}
      <ClubList
        keyword={match.params.keyword}
        category={match.params.category}
        tag={match.params.tag}
        status={match.params.status}
        user={user}
      />
    </>
  );
};

export default MainPage;
