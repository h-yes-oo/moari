import React, { FC } from 'react';
import styled from 'styled-components';
import { AuthResponse } from 'api/auth';

const Root = styled.div`
    display: flex;
    margin-right: 14px;
    align-items: flex-start;
`

const ProfileImage = styled.img`
    width: 34px;
    height: 34px;
    border: 2px solid #FFFFFF;
    filter: drop-shadow(0px 10px 20px rgba(31, 32, 65, 0.1));
    border-radius: 24px;
`

const ProfileName = styled.div`
    width: 144px;
    height: 34px;
    margin-left: 10px;

    font-family: Montserrat;
    font-style: normal;
    font-weight: bold;
    font-size: 20px;

    display: flex;
    align-items: center;

    background: -webkit-linear-gradient(90deg, #BC9CFF 0%, #8BA4F9 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`


interface ProfileProps {
    writer: AuthResponse;
}

const Profile: FC<ProfileProps> = ({ writer }) => {
    return (
        <Root> 
            <ProfileImage src={writer.image} />
            <ProfileName>{writer.name}</ProfileName>
        </Root>
        )}

export default Profile;
