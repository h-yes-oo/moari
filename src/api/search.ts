import axios from 'axios';
import { SEARCH_SERVER } from 'components/Config'
import Club from 'types';

export async function searchClubRequest ({ keyword }: SearchClubPayload) {
    return await axios.get<SearchClubResponse>(`${SEARCH_SERVER}/${keyword}`)
    .then(res => res.data);
  }

export interface SearchClubPayload {
    keyword: string;
}

export interface SearchClubResponse {
    success: boolean,
    clubs: Club[],
    err: any | null
}