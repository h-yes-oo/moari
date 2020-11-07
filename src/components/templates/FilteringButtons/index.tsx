import React, { FC, ReactNode, useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import styled from 'styled-components';

import * as T from 'types';
import emptyTag from 'assets/icons/empty-tag.svg';
import fullTag from 'assets/icons/full-tag.svg';
import palette from 'constants/palette';

const Root = styled.div`
  display: flex;
  justify-content: center;
`

const TagButtonsContainer = styled.div`
  width: 1024px;
  display: flex;
  justify-content: center;
  margin: 24px 0;
`

const TagButtonContainer = styled.div`
  position: relative;
  text-align: center;
  cursor: pointer;
`

const TagButtonImg = styled.img`
  margin: 4px;
`

const TagButtonText = styled.div<{ isSelected: boolean }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 18px;
  color: ${(props) => props.isSelected ? '#ffffff' : palette.greyText.toString()};
`

interface Props {
  filter: T.FilterType;
}

const FilteringButtons: FC<Props & RouteComponentProps> = ({ filter, history }) => {
  const [selected, setSelected] = useState<string>("");
  
  const handleClick: (tag: string) => void = (tag) => {
    setSelected(tag);

    let filterstring: string = "";
    if (filter === T.Category) filterstring = "category";
    else if (filter === T.Tag) filterstring = "tag";
    else if (filter === T.ClubStatus) filterstring = "status";
  
    history.push(`/${filterstring}/${tag.toLowerCase()}`);
  }

  const tagButtons: ReactNode = Object.entries(filter).map(([key, text]) => {
    const tagImg = selected === key ? fullTag : emptyTag;
    const isSelected: boolean = selected === key ? true : false;

    return (
      <TagButtonContainer onClick={() => handleClick(key)}>
        <TagButtonImg src={tagImg} />
        <TagButtonText isSelected={isSelected} >{text}</TagButtonText>
      </TagButtonContainer>
    )
  });

  useEffect(() => {
    console.log(filter);
  }, [filter]);

  return (
    <Root>
      <TagButtonsContainer>
        {tagButtons}
      </TagButtonsContainer>
    </Root>
  );
}

export default withRouter(FilteringButtons);