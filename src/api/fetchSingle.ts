import axios from 'axios';

import { CLUB_SERVER } from 'components/Config';
import Club from 'types';

export async function fetchClubSingleRequest({ id }: FetchClubPayload) {
  return await axios.get<FetchClubResponse>(`${CLUB_SERVER}/${id}`).then((res) => res.data);
}

export interface FetchClubPayload {
  id: string;
}

export interface FetchClubResponse {
  success: boolean;
  club: Club;
  err: any | null;
}
