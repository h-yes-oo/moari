import React, { FC, ReactNode } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import ClubCard from 'components/templates/ClubCard';
import { RootState } from 'reducers';


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
}


const ClubList: FC<Props> = ({ keyword }) => {    
  const clubs = useSelector((state: RootState) => state.fetch.clubs);
  const filteredClubs = useSelector((state: RootState) => state.search.clubs);

  const clubList: ReactNode = keyword === undefined ? clubs.map((club) => {  
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
  }) : filteredClubs.map((club) => {
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
