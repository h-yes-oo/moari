import axios from 'axios';
import { CLUB_SERVER, SEARCH_SERVER } from 'components/Config';
import Club from 'types';

export interface ClubListResponse {
  success: boolean;
  clubs: Club[];
  err: any | null;
}

export async function fetchClubsAllRequest() {
  return await axios.get<ClubListResponse>(`${CLUB_SERVER}`).then((res) => res.data);
}

export interface SearchClubPayload {
  keyword: string;
}

export async function searchClubRequest({ keyword }: SearchClubPayload) {
  return await axios.get<ClubListResponse>(`${SEARCH_SERVER}/${keyword}`).then((res) => res.data);
}
