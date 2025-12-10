export interface User {
    id: number;
    username: string;
    fullName: string;
}

export interface Comment {
    id: number;
    body: string;
    postId: number;
    likes: number;
    user: User;
}

// Interfejs dla całej odpowiedzi z API: https://dummyjson.com/comments
export interface CommentsResponse {
    comments: Comment[];
    total: number;
    skip: number;
    limit: number;
}
