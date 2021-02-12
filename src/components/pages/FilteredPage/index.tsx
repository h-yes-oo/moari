import React, { FC, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import * as T from 'types';
import ClubList from 'components/templates/ClubList';
import FilteringButtons from 'components/templates/FilteringButtons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClubsAll } from 'modules/clubList';
import { RootState } from 'modules'
import Loading from 'components/templates/Loading';
import { AuthResponse } from 'api/auth';

interface Props {
  user: AuthResponse;
}

interface MatchParams {
  category: string;
  tag: string;
  status: string;
}


const FilteredPage: FC<Props & RouteComponentProps<MatchParams>> = ({ match, user }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchClubsAll.request());
  }, []);

  const fetchedData = useSelector((state: RootState) => state.clubList.data);

  const getFilterType: () => T.FilterType = () => {
    if (match.params.category) return T.Category
    else if (match.params.tag) return T.Tag
    else if (match.params.status) return T.Status
    return T.Category;
  }

  const filterType: T.FilterType = getFilterType();

  if(fetchedData === null){
    return(
      <>
        <FilteringButtons filter={filterType} />
        <Loading />
      </>
    )
  }

  return (
    <>
      <FilteringButtons filter={filterType} />
      <ClubList
        // keyword={match.params.keyword}
        category={match.params.category}
        tag={match.params.tag}
        status={match.params.status}
        user={user}
      /> 
    </>

  );
}

export default FilteredPage;