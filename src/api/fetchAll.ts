import axios from 'axios';
import { CLUB_SERVER } from 'components/Config'
import Club from 'types';

export async function fetchClubsAllRequest() {
    return await axios.get<FetchAllResponse>(`${CLUB_SERVER}`)
    // res.json()
    .then(res => res.data);
  }

export interface FetchAllResponse {
  success: boolean,
  clubs: Club[],
  err: any | null
}