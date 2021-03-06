import React, { FC, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import * as T from 'types';
import ClubCard from 'components/templates/ClubCard';
import { RootState } from 'modules/index';
import Club from 'types';
import { AuthResponse } from 'api/auth';

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
  user: AuthResponse;
}

const ClubList: FC<Props> = ({ keyword, category, tag, status, user }) => {    
  const fetchedData = useSelector((state: RootState) => state.clubList.data);
  const clubs = fetchedData ? fetchedData.clubs : [];

  const getFilteredClubs: () => Club[] = () => {
    // TODO: erase console logs and shorten return statements
    if (category !== undefined) {
      const categoryString = T.Category[category.toUpperCase() as keyof typeof T.Category];
      return clubs.filter((club) => club.category === categoryString);
    }
    else if (tag !== undefined) {
      return clubs.filter((club) => club.tags ? club.tags.includes(tag) : clubs);
    }
    else if (status !== undefined) {
      const statusString = T.Status[status.toUpperCase() as keyof typeof T.Status];
      return clubs.filter((club) => club.status === statusString);
    }
    else return clubs;
  }

  const filteredClubs: Club[] = getFilteredClubs();

  const clubsToShow = 
    (category !== undefined || tag !== undefined || status !== undefined) ? filteredClubs : clubs;
  
  const clubList: ReactNode = clubsToShow.map((club : Club, index) => {  
    return (
      <CardWrapper key={index}>
        <ClubCard
            key={club._id}
            id={club._id}
            name={club.name}
            description={club.description}
            image={club.photos ? club.photos[0] : undefined}
            status={club.status}
            likes={club.likedUsers.length}
            views={club.views}
            liked={user?.likedClubs?.includes(club._id)}
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
