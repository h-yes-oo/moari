import React, { FC, ReactNode, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import ClubCard from 'components/templates/ClubCard';
import { RootState } from 'reducers';
import { Club } from 'store/types';


const Root = styled.div`
` 

const ClubListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 132px; 
`

const CardWrapper = styled.div`
  margin: 2em 0;
`

interface Props {
  keyword?: string;
  category?: string;
  tag?: string;
  status?: string;
}

const ClubList: FC<Props> = ({ keyword, category, tag, status }) => {    
  // const [clubsLoaded, setClubsLoaded] = useState<Boolean>(false);
  const clubs = useSelector((state: RootState) => state.fetch.clubs);
  const searchedClubs = useSelector((state: RootState) => state.search.clubs);

  const getFilteredClubs: () => Club[] = () => {
    // TODO: erase console logs and shorten return statements
    if (category !== undefined) {
      // console.log("category searching...");
      return clubs.filter((club) => club.category === category);
    }
    else if (tag !== undefined) {
      // console.log("tag searching...");
      return clubs.filter((club) => club.tags ? club.tags.includes(tag) : clubs);
    }
    else if (status !== undefined) {
      // console.log("status searching...");
      return clubs.filter((club) => club.recruit === status);
    }
    else return clubs;
  }

  const filteredClubs: Club[] = getFilteredClubs();

  const clubsToShow = keyword !== undefined ? searchedClubs :
    (category !== undefined || tag !== undefined || status !== undefined) ? filteredClubs : clubs;
  
  const clubList: ReactNode = clubsToShow.map((club) => {  
    return (
      <CardWrapper>
        <ClubCard
            key={club._id}
            id={club._id}
            name={club.name}
            description={club.description}
            image={club.photos ? club.photos[0] : undefined}
        />
      </CardWrapper>
    )
  });

  return (
    <Root>
      <ClubListContainer>
        {clubList}
      </ClubListContainer>
    </Root>
  );
}

export default ClubList;
