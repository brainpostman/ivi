interface IMovieJsonResponse {
    id: number;
    name: string | null;
    name_en: string | null;
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
    createdAt: string | null;
    updatedAt: string | null;
    countries: IMovieJsonCountry[];
    genres: IMovieJsonGenre[];
    operators: ({
        FilmOperators: IFilmStaffTableJoin;
    } & IMovieJsonStaffer)[];
    compositors: ({
        FilmCompositors: IFilmStaffTableJoin;
    } & IMovieJsonStaffer)[];
    actors: ({
        FilmActors: IFilmStaffTableJoin;
    } & IMovieJsonStaffer)[];
    artists: ({
        FilmArtists: IFilmStaffTableJoin;
    } & IMovieJsonStaffer)[];
    directors: ({
        FilmDirectors: IFilmStaffTableJoin;
    } & IMovieJsonStaffer)[];
    montages: ({
        FilmMontages: IFilmStaffTableJoin;
    } & IMovieJsonStaffer)[];
    scenario: ({
        FilmScenario: IFilmStaffTableJoin;
    } & IMovieJsonStaffer)[];
    spectators: {
        country: string | null;
        count: string | null;
    }[];
}

interface IMovieJsonCountry {
    id: number;
    name: string | null;
    fk_countryid: number | null;
    createdAt: string | null;
    updatedAt: string | null;
    FilmCountries: {
        id: number;
        filmId: number;
        countryId: number;
    };
}

interface IMovieJsonGenre {
    id: number;
    name: string | null;
    name_en: string | null;
    createdAt: string | null;
    updatedAt: string | null;
    FilmGenres: {
        id: number;
        filmId: number;
        genreId: number;
    };
}

interface IMovieJsonStaffer {
    id: number;
    name: string | null;
    createdAt: string | null;
    updatedAt: string | null;
}

interface IFilmStaffTableJoin {
    id: number;
    filmId: number;
    staffId: number;
}

export interface IMovie {
    id: number;
    name: string | null;
    name_en: string | null;
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
    createdAt: Date | null;
    updatedAt: Date | null;
    countries: IMovieCountry[];
    genres: IMovieGenre[];
    operators: IMovieStaffer[];
    compositors: IMovieStaffer[];
    actors: IMovieStaffer[];
    artists: IMovieStaffer[];
    directors: IMovieStaffer[];
    montages: IMovieStaffer[];
    scenario: IMovieStaffer[];
    spectators: {
        country: string | null;
        count: string | null;
    }[];
}

export interface IMovieCountry {
    id: number;
    name: string | null;
    fk_countryid: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
}

export class MovieCountry implements IMovieCountry {
    constructor(country: IMovieJsonCountry) {
        this.id = country.id;
        this.name = country.name;
        this.fk_countryid = country.fk_countryid;
        this.createdAt = country.createdAt ? new Date(country.createdAt) : null;
        this.updatedAt = country.updatedAt ? new Date(country.updatedAt) : null;
    }
    id: number;
    name: string | null;
    fk_countryid: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
}

export interface IMovieGenre {
    id: number;
    name: string | null;
    name_en: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
}

export class MovieGenre implements IMovieGenre {
    constructor(genre: IMovieJsonGenre) {
        this.id = genre.id;
        this.name = genre.name;
        this.name_en = genre.name_en;
        this.createdAt = genre.createdAt ? new Date(genre.createdAt) : null;
        this.updatedAt = genre.updatedAt ? new Date(genre.updatedAt) : null;
    }
    id: number;
    name: string | null;
    name_en: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
}

export interface IMovieStaffer {
    id: number;
    name: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
}

export class MovieStaffer implements IMovieStaffer {
    constructor(staffer: IMovieJsonStaffer) {
        this.id = staffer.id;
        this.name = staffer.name;
        this.createdAt = staffer.createdAt ? new Date(staffer.createdAt) : null;
        this.updatedAt = staffer.updatedAt ? new Date(staffer.updatedAt) : null;
    }
    id: number;
    name: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
}

export class Movie implements IMovie {
    constructor(movie: IMovieJsonResponse) {
        this.id = movie.id;
        this.name = movie.name;
        this.name_en = movie.name_en;
        this.type = movie.type;
        this.mainImg = movie.mainImg;
        this.year = movie.year;
        this.tagline = movie.tagline;
        this.budget = movie.budget;
        this.fees = movie.fees;
        this.feesUS = movie.feesUS;
        this.feesRU = movie.feesRU;
        this.premiere = movie.premiere;
        this.premiereRU = movie.premiereRU;
        this.releaseDVD = movie.releaseDVD;
        this.releaseBluRay = movie.releaseBluRay;
        this.age = movie.age;
        this.ratingMPAA = movie.ratingMPAA;
        this.time = movie.time;
        this.description = movie.description;
        this.scoreAVG = movie.scoreAVG;
        this.createdAt = movie.createdAt ? new Date(movie.createdAt) : null;
        this.updatedAt = movie.updatedAt ? new Date(movie.updatedAt) : null;
        this.countries = movie.countries.map((country) => {
            return new MovieCountry(country);
        });
        this.genres = movie.genres.map((genre) => {
            return new MovieGenre(genre);
        });
        this.operators = movie.operators.map((operator) => {
            return new MovieStaffer(operator);
        });
        this.compositors = movie.compositors.map((compositor) => {
            return new MovieStaffer(compositor);
        });
        this.actors = movie.actors.map((actor) => {
            return new MovieStaffer(actor);
        });
        this.artists = movie.artists.map((artist) => {
            return new MovieStaffer(artist);
        });
        this.directors = movie.directors.map((director) => {
            return new MovieStaffer(director);
        });
        this.montages = movie.montages.map((montager) => {
            return new MovieStaffer(montager);
        });
        this.scenario = movie.scenario.map((scenarist) => {
            return new MovieStaffer(scenarist);
        });
        this.spectators = movie.spectators;
    }
    id: number;
    name: string | null;
    name_en: string | null;
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
    createdAt: Date | null;
    updatedAt: Date | null;
    countries: IMovieCountry[];
    genres: IMovieGenre[];
    operators: IMovieStaffer[];
    compositors: IMovieStaffer[];
    actors: IMovieStaffer[];
    artists: IMovieStaffer[];
    directors: IMovieStaffer[];
    montages: IMovieStaffer[];
    scenario: IMovieStaffer[];
    spectators: { country: string | null; count: string | null }[];
}
