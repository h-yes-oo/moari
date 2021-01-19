import axios from 'axios';
import { CLUB_SERVER } from 'components/Config'

export async function likeClubRequest({cludId, userId}: LikeClubPayload) {
    return axios.post<LikeClubResponse>(`${CLUB_SERVER}/${cludId}/like/${userId}`)
    .then(response => response.data)
};

export interface LikeClubPayload {
    cludId: string,
    userId: string,
    setLikeImg : React.Dispatch<React.SetStateAction<boolean>>,
    likeImg : boolean
}

export interface LikeClubResponse {
    success: boolean,
    err: any | null
}