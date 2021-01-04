import React, { FC, ReactNode, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';

import * as T from 'types';
import BaseLayout from 'components/templates/BaseLayout';
import ClubList from 'components/templates/ClubList';
import FilteringButtons from 'components/templates/FilteringButtons';
import { useDispatch } from 'react-redux';
import { fetchClubsAll } from 'actions/club';

const Root = styled.div`

`

interface Props {

}

interface MatchParams {
  category: string;
  tag: string;
  status: string;
}


const FilteredPage: FC<Props & RouteComponentProps<MatchParams>> = ({ match }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchClubsAll.request());
  }, []);

  const getFilterType: () => T.FilterType = () => {
    if (match.params.category) return T.Category
    else if (match.params.tag) return T.Tag
    else if (match.params.status) return T.Status
    return T.Category;
  }

  const filterType: T.FilterType = getFilterType();

  return (
    <BaseLayout>
      <FilteringButtons filter={filterType} />
      <ClubList
        // keyword={match.params.keyword}
        category={match.params.category}
        tag={match.params.tag}
        status={match.params.status}
      /> 
    </BaseLayout>

  );
}

export default FilteredPage;