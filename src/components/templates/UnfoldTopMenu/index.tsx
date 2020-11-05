import palette from 'constants/palette';
import React, { FC, ReactNode, useEffect } from 'react';
import styled from 'styled-components';

const Root = styled.div`
  position: fixed;
  width: 100%;
  height: 368px;
  background-color: #ffffff;
  border: 2px solid ${palette.greyBorder.toString()};
  opacity: 0.9;
  z-index: 200;

  display: flex;
`

const TabSection = styled.div<{ tabWidth: number }>` 
  border-left: 2px solid ${palette.greyBorder.toString()};
  width: ${(props) => props.tabWidth}px;
`

interface Props {
  homeWidth: number | undefined;
  categoryWidth: number | undefined;
  tagWidth: number | undefined;
  statusWidth: number | undefined;
}

const UnfoldTopMenu: FC<Props> = ({ homeWidth, categoryWidth, tagWidth, statusWidth }) => {  
  // useEffect(() => {
  //   console.log(homeWidth);
  //   console.log(categoryWidth);
  //   console.log(tagWidth);
  //   console.log(statusWidth);    
  // }, [])

  return (homeWidth === undefined || categoryWidth === undefined || tagWidth === undefined || statusWidth === undefined) ? null : (
    <Root>
      <TabSection tabWidth={homeWidth+24}>

      </TabSection>
      <TabSection tabWidth={categoryWidth}>

      </TabSection>
      <TabSection tabWidth={tagWidth}>

      </TabSection>
      <TabSection tabWidth={statusWidth}>

      </TabSection>
    </Root>
  )
}

export default UnfoldTopMenu