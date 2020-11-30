import React, { FC, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import * as T from 'types';
import prepareSvg from 'assets/icons/stat-prepare.svg';
import alwaysSvg from 'assets/icons/stat-always.svg';
import openSvg from 'assets/icons/stat-open.svg';
import closedSvg from 'assets/icons/stat-closed.svg';
import logoPng from 'assets/images/logo.png';

const Root = styled.div<{ image?: string | undefined }>`
    background-image: url(${(props) => props.image ? props.image : logoPng });
    // background-size: cover;
    background-position: center;
    width: 358px;
    height: 512px;
    border-radius: 20px;
    background-color: #EEEEEE;
    position: relative;
    cursor: pointer;
    margin: 0 72px;
    flex-shrink: 0;
` 

const StatusLabel = styled.img`
    width: 108px;
    height: auto;
    position: absolute;
    left: -12px;
    top: 16px;
`

interface Props {
    key: string;
    id: string;
    name: string;
    description: string;
    image?: any; // need change
    status?: T.Status;
    // tags?: Array<string>; // types에 tag 정의
    category?: T.Category;
    tags?: string[];
}

const ClubCard: FC<Props & RouteComponentProps> = ({ id, status, image, history }) => {
    // const goClubDetail: (e: React.MouseEvent<HTMLDivElement>) => void = (e) => {
    const goClubDetail: (id: string) => void = (id) => {
        history.push(`/club/${id}`);
    }
        
    const imageBuffer = image ? image.img.data.data : "";
    const imageConverterPrefix = "data:image/png;base64,"
    const imageElem = image ? imageConverterPrefix + btoa(String.fromCharCode.apply(null, imageBuffer)) : "";
    // console.log(imageElem);
    
    // need refactoring: switch-case
    return (
        <Root id="clubcard-root" onClick={() => goClubDetail(id)} image={imageElem}>
            {(() => {
                switch (status) {
                    case T.Status.PREPARE:
                        return <StatusLabel src={prepareSvg} />
                    case T.Status.ALWAYS:
                        return <StatusLabel src={alwaysSvg} />
                    case T.Status.OPEN:
                        return <StatusLabel src={openSvg} />
                    case T.Status.CLOSED:
                        return <StatusLabel src={closedSvg} />
                    default:
                        return null;
                }
            })()}
        </Root>
    );
}

export default withRouter(ClubCard);
