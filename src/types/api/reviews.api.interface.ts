export interface IReviewGetResponse {
    id: number;
    text: string;
    user_id: number;
    film_id: number;
    parent: number | null;
    user_name: string;
    user_email: string;
    createdAt: string;
}

export interface IReviewPostRequest {
    text: string;
    user_id: number;
    film_id: number;
    parent: number | null;
}
