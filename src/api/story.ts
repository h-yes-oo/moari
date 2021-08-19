import axios from 'axios';
import { STORY_SERVER } from 'components/Config';
import Story from 'types';

export interface StoriesResponse {
    success: boolean;
    stories: Story[];
    err: any | null;
}

export interface StoryResponse {
    success: boolean;
    story: Story;
    err: any | null;
}

export interface FetchStoriesPayload {
    clubId: string;
}

export async function fetchStoriesRequest({ clubId }: FetchStoriesPayload) {
    return await axios.get<StoriesResponse>(`${STORY_SERVER}/getStories/${clubId}`)
    .then(res => res.data);
}

export interface DeleteStoryPayload {
    storyId: string;
}

export async function deleteStoryRequest({ storyId }: DeleteStoryPayload) {
    return await axios.delete<StoryResponse>(`${STORY_SERVER}/deleteStory/${storyId}`)
    .then(res => res.data);
}

type dropFile = {
    name: any;
    preview: string;
}

export interface SaveStoryPayload {
    clubId: string;
    content: string;
    files: (Blob & dropFile)[];
}

export async function saveStoryRequest({ clubId, content, files }: SaveStoryPayload) {
    let formData = new FormData;
        const config = {
            header: {'content-type': 'multipart/form-data'}
        }
        for( let i = 0; i < files.length; i++){
            formData.append("photos",files[i])
        }

        formData.append("clubId",clubId);
        formData.append("content",content);
    return await axios.post<StoryResponse>(`${STORY_SERVER}/saveStory`, formData)
    .then(res => res.data);
}