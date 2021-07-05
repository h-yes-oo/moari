import React, { Dispatch, FC, ReactNode, SetStateAction } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import styled from 'styled-components';

import palette from 'constants/palette';
import * as T from 'types';

const Root = styled.div`
  position: fixed;
  width: 100%;
  height: 368px;
  background-color: #ffffff;
  border: 2px solid ${palette.greyBorder.toString()};
  opacity: 0.9;
  z-index: 180;

  display: flex;
  transform: translateY(180px);
`;

const TabSection = styled.div<{ tabWidth: number }>`
  border-left: 2px solid ${palette.greyBorder.toString()};
  width: ${(props) => props.tabWidth}px;
  padding: 20px 16px;
  box-sizing: border-box;
`;

const MenuText = styled.div<{ showAll?: boolean }>`
  margin: 10px 0;
  cursor: pointer;
  color: ${(props) => (props.showAll ? '#000000' : palette.greyText.toString())};
  &:hover {
    text-decoration: underline;
  }
`;

interface Props {
  homeWidth: number | undefined;
  categoryWidth: number | undefined;
  tagWidth: number | undefined;
  statusWidth: number | undefined;
  setShowUnfoldMenu: Dispatch<SetStateAction<any>>;
}

const UnfoldTopMenu: FC<Props & RouteComponentProps> = ({
  homeWidth,
  categoryWidth,
  tagWidth,
  statusWidth,
  setShowUnfoldMenu,
  history,
}) => {
  const goFindClubs: (type: string, select?: string) => void = (type, select) => {
    history.push(`/${type}/${select}`);
  };

  let categoryIdx = 1;
  let tagIdx = 1;

  const categoryMenus: ReactNode = Object.entries(T.Category).map(([key, category]) => {
    if (categoryIdx === 9)
      return (
        <MenuText key={categoryIdx++} showAll={true} onClick={() => goFindClubs('category')}>
          분류 전체보기
        </MenuText>
      );
    if (categoryIdx === 10) return null;
    return (
      <MenuText key={categoryIdx++} onClick={() => goFindClubs('category', key.toLowerCase())}>
        {category}
      </MenuText>
    );
  });

  const tagMenus: ReactNode = Object.entries(T.Tag).map(([key, tag]) => {
    if (tagIdx === 9)
      return (
        <MenuText key={tagIdx++} showAll={true} onClick={() => goFindClubs('tag')}>
          분류 전체보기
        </MenuText>
      );
    if (tagIdx === 10) return null;
    return (
      <MenuText key={tagIdx++} onClick={() => goFindClubs('tag', key.toLowerCase())}>
        {tag}
      </MenuText>
    );
  });

  const statusMenus: ReactNode = Object.entries(T.Status).map(([key, status]) => {
    return (
      <MenuText key={status} onClick={() => goFindClubs('status', key.toLowerCase())}>
        {status}
      </MenuText>
    );
  });

  return homeWidth === undefined ||
    categoryWidth === undefined ||
    tagWidth === undefined ||
    statusWidth === undefined ? null : (
    <Root onMouseEnter={() => setShowUnfoldMenu(true)} onMouseLeave={() => setShowUnfoldMenu(false)}>
      <TabSection tabWidth={homeWidth + 32} />
      <TabSection tabWidth={categoryWidth}>{categoryMenus}</TabSection>
      <TabSection tabWidth={tagWidth}>{tagMenus}</TabSection>
      <TabSection tabWidth={statusWidth}>{statusMenus}</TabSection>
    </Root>
  );
};

export default withRouter(UnfoldTopMenu);
