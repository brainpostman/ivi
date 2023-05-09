export interface IFilmsGetRequest {
    order?: string;
    page?: number;
    take?: number;
    orderBy?: string;
    genres?: string[];
    genres_en?: string[];
    countries?: string[];
    actors?: string[];
    directors?: string[];
}

export interface IFilmsgGetResponse {
    id: number;
    name: string;
    name_en: string;
    year: number;
    countries: { name: string }[];
    genres: { name: string; name_en: string }[];
    tagline: string;
    directors: { name: string }[];
    artists: { name: string }[];
    age: string;
    description: string;
    mainImg: string;
    time: string;
    premiereRU: string;
    premiere: string;
}

export interface IMovie extends Omit<IFilmsgGetResponse, 'countries' | 'genres' | 'directors'> {
    countries: string;
    genres: string;
    directors: string;
}
