import React, { FC, ReactNode, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { ProposeClubText } from 'components/templates/SimpleText';
import TopClubList from 'components/templates/TopClubList';
import BaseLayout from 'components/templates/BaseLayout';
import ClubList from 'components/templates/ClubList';
import { useSelector, useDispatch } from 'react-redux';
import { fetchClubsAll } from 'modules/fetchAll';
import { searchClub } from 'modules/search'
import { RootState } from 'modules/index';

interface Props {

}

interface MatchParams {
    keyword: string;
    category: string;
    tag: string;
    status: string;
}

const MainPage: FC<Props & RouteComponentProps<MatchParams>> = ({ match }) => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(searchClub.request({ keyword: match.params.keyword }));
    }, []);

    useEffect(() => {
        dispatch(fetchClubsAll.request());
    }, []);

    const isFilteredPage: boolean = Object.keys(match.params).length > 0;
    const topClubList: ReactNode = isFilteredPage ? null : <TopClubList />
    const proposeClubText: ReactNode = isFilteredPage ? null : <ProposeClubText />

    const fetchedData = useSelector((state: RootState) => state.fetchAll.data);
    const searchedData = useSelector((state: RootState) => state.search.data);

    if(isFilteredPage)
    {
        if(searchedData === null) {
        return (
        <BaseLayout>
            검색 결과를 가져오는 중...
        </BaseLayout>
        )} else {
            return (
            <BaseLayout>
                <ClubList
                    keyword={match.params.keyword}
                    category={match.params.category}
                    tag={match.params.tag}
                    status={match.params.status}
                /> 
            </BaseLayout>
            )
        }
    } else{
        if(fetchedData === null){
            return (
            <BaseLayout>
                로딩중...
            </BaseLayout>
            )
        }
        return (
            <BaseLayout>
                {proposeClubText}
                {topClubList}
                <ClubList
                    keyword={match.params.keyword}
                    category={match.params.category}
                    tag={match.params.tag}
                    status={match.params.status}
                /> 
            </BaseLayout>
        );
    }
}

export default MainPage;