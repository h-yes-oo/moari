import axios from 'axios';

import { CLUB_SERVER } from 'components/Config';
import Club from 'types';

export async function postClubRequest({ name, school, description, photos, category, tags, status }: PostClubPayload) {
  const formData = new FormData();

  formData.append('name', name);
  formData.append('school', school);
  formData.append('description', description);
  formData.append('category', category);
  formData.append('status', status);

  if (photos) {
    for (let i = 0; i < photos.length; i++) {
      formData.append('photos', photos[i]);
    }
  }

  return await axios.post<PostClubResponse>(CLUB_SERVER, formData).then((res) => res.data);
}

export interface PostClubPayload {
  name: string;
  school: string;
  description: string;
  photos?: FileList;
  category: string;
  tags: string[];
  status: string;
  history: any;
}

export interface PostClubResponse {
  success: boolean;
  club: Club;
  err: any | null;
}
