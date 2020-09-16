import React, { FC } from 'react';
import styled from 'styled-components';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import * as T from 'types';
import prepareSvg from 'assets/icons/stat-prepare.svg';
import alwaysSvg from 'assets/icons/stat-always.svg';
import openSvg from 'assets/icons/stat-open.svg';
import closedSvg from 'assets/icons/stat-closed.svg';

const Root = styled.div`
    width: 358px;
    height: 512px;
    border-radius: 20px;
    background-color: #EEEEEE;
    position: relative;
    cursor: pointer;
` 

const StatusLabel = styled.img`
    width: 108px;
    height: auto;
    position: absolute;
    left: -12px;
    top: 16px;
`

interface Props {
    id: number;
    name?: string;
    description?: string;
    school?: string; // types에 tag 정의
    image?: string; // need change
    status?: T.ClubStatus
    tags?: Array<string>; // types에 tag 정의
}

const ClubCard: FC<Props & RouteComponentProps> = ({ id, status, history }) => {
    // const goClubDetail: (e: React.MouseEvent<HTMLDivElement>) => void = (e) => {
    const goClubDetail: (id: number) => void = (id) => {
        history.push(`/club/${id}`);
    }
    
    // need refactoring: switch-case
    return (
        <Root onClick={() => goClubDetail(id)}>
            {(() => {
                switch (status) {
                    case T.ClubStatus.PREPARE:
                        return <StatusLabel src={prepareSvg} />
                    case T.ClubStatus.ALWAYS:
                        return <StatusLabel src={alwaysSvg} />
                    case T.ClubStatus.OPEN:
                        return <StatusLabel src={openSvg} />
                    case T.ClubStatus.CLOSED:
                        return <StatusLabel src={closedSvg} />
                    default:
                        return null;
                }
            })()}
        </Root>
    );
}

export default withRouter(ClubCard);
