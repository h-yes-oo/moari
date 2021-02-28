import axios from 'axios';
import { COMMENT_SERVER } from 'components/Config';
import { Comment } from 'types';

export interface CommentsResponse {
    success: boolean,
    comments: Comment[],
    err: any | null
}

export interface CommentResponse {
    success: boolean,
    comment: Comment,
    err: any | null
}

export interface FetchCommentsPayload {
    clubId: string
}

export async function fetchCommentsRequest({ clubId }: FetchCommentsPayload) {
    return await axios.get<CommentsResponse>(`${COMMENT_SERVER}/getComments/${clubId}`)
    .then(res => res.data);
}

export interface SearchCommentsPayload {
    clubId: string,
    keyword: string
}

export async function searchCommentsRequest({ clubId, keyword }: SearchCommentsPayload) {
    return await axios.get<CommentsResponse>(`${COMMENT_SERVER}/searchComment/${clubId}/${keyword}`)
    .then(res => res.data);
}

export interface DeleteCommentPayload {
    commentId: string
}

export async function deleteCommentRequest({ commentId }: DeleteCommentPayload) {
    return await axios.delete<CommentResponse>(`${COMMENT_SERVER}/deleteComment/${commentId}`)
    .then(res => res.data);
}

export interface SaveCommentPayload {
    writer: string,
    clubId: string,
    content: string,
    responseTo?: string
}

export async function saveCommentRequest({ writer, clubId, content, responseTo }: SaveCommentPayload) {
    return await axios.post<CommentResponse>(`${COMMENT_SERVER}/saveComment`,{
        writer, clubId, content, responseTo
    })
    .then(res => res.data);
}