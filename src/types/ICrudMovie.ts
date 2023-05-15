export interface ICRUDGenre {
    id: number;
    name: string;
    name_en: string;
    createdAt: string;
    updatedAt: string;
    FilmGenres?: {
        id: number;
        filmId: number;
        genreId: number;
    };
}

interface ICRUDCountry {
    id: number;
    name: string;
    fk_countryid: number | null;
    createdAt: string;
    updatedAt: string;
    FilmCountries: {
        id: number;
        filmId: number;
        countryId: number;
    };
}

interface ICRUDStaffer {
    id: number;
    name: string;
    biography: string;
    createdAt: string;
    updatedAt: string;
}

interface ICRUDStafferInMovie {
    id: number;
    filmId: number;
    staffId: number;
}

export interface ICRUDMovie {
    id: number;
    name: string;
    name_en: string;
    type: string | null;
    mainImg: string | null;
    year: number | null;
    tagline: string | null;
    budget: string | null;
    fees: string | null;
    feesUS: string | null;
    feesRU: string | null;
    premiere: string | null;
    premiereRU: string | null;
    releaseDVD: string | null;
    releaseBluRay: string | null;
    age: string | null;
    ratingMPAA: string | null;
    time: string | null;
    description: string | null;
    scoreAVG: number | null;
    createdAt: string;
    updatedAt: string;
    countries: ICRUDCountry[];
    genres: ICRUDGenre[];
}

export interface ICRUDDetailedMovie extends ICRUDMovie {
    actors: ({
        FilmActors: ICRUDStafferInMovie;
    } & ICRUDStaffer)[];
    directors: ({
        FilmDirectors: ICRUDStafferInMovie;
    } & ICRUDStaffer)[];
    operators: ({
        FilmOperators: ICRUDStafferInMovie;
    } & ICRUDStaffer)[];
    compositors: ({
        FilmCompositors: ICRUDStafferInMovie;
    } & ICRUDStaffer)[];
    artists: ({
        FilmArtists: ICRUDStafferInMovie;
    } & ICRUDStaffer)[];
    montages: ({
        FilmMontages: ICRUDStafferInMovie;
    } & ICRUDStaffer)[];
    scenario: ({
        FilmScenario: ICRUDStafferInMovie;
    } & ICRUDStaffer)[];
    spectators: {
        country: string;
        count: string;
    }[];
}
