export interface IGenreJson {
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

interface ICountryJson {
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

interface IStafferJson {
    id: number;
    name: string;
    biography: string;
    createdAt: string;
    updatedAt: string;
}

interface IStafferInMovieJson {
    id: number;
    filmId: number;
    staffId: number;
}

export interface IFilmJson {
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
    countries: ICountryJson[];
    genres: IGenreJson[];
}

export interface IDetailedFilmJson extends IFilmJson {
    actors: ({
        FilmActors: IStafferInMovieJson;
    } & IStafferJson)[];
    directors: ({
        FilmDirectors: IStafferInMovieJson;
    } & IStafferJson)[];
    operators: ({
        FilmOperators: IStafferInMovieJson;
    } & IStafferJson)[];
    compositors: ({
        FilmCompositors: IStafferInMovieJson;
    } & IStafferJson)[];
    artists: ({
        FilmArtists: IStafferInMovieJson;
    } & IStafferJson)[];
    montages: ({
        FilmMontages: IStafferInMovieJson;
    } & IStafferJson)[];
    scenario: ({
        FilmScenario: IStafferInMovieJson;
    } & IStafferJson)[];
    spectators: {
        country: string;
        count: string;
    }[];
}

export interface ICrudGenre {
    id: number;
    name: string;
    name_en: string;
    createdAt: string;
    updatedAt: string;
}

export class CrudGenre implements ICrudGenre {
    constructor(genre: IGenreJson) {
        this.id = genre.id;
        this.name = genre.name;
        this.name_en = genre.name_en;
        this.createdAt = genre.createdAt;
        this.updatedAt = genre.updatedAt;
    }
    id: number;
    name: string;
    name_en: string;
    createdAt: string;
    updatedAt: string;
}

export interface ICrudFilm {
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
    countries: string[];
    genres: string[];
    genres_en: string[];
}

export class CrudFilm implements ICrudFilm {
    constructor(movie: IFilmJson) {
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
        this.createdAt = movie.createdAt;
        this.updatedAt = movie.updatedAt;
        this.countries = movie.countries.map((country) => {
            return country.name;
        });
        this.genres = movie.genres.map((genre) => {
            return genre.name;
        });
        this.genres_en = movie.genres.map((genre) => {
            return genre.name_en;
        });
    }
    countries: string[];
    genres: string[];
    genres_en: string[];
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
}

export interface ICrudDetailedFilm extends ICrudFilm {
    actors: string[];
    directors: string[];
    operators: string[];
    compositors: string[];
    artists: string[];
    montages: string[];
    scenario: string[];
    spectators: {
        country: string;
        count: string;
    }[];
}

export class CrudDetailedFilm extends CrudFilm implements ICrudDetailedFilm {
    constructor(movie: IDetailedFilmJson) {
        super(movie);
        this.actors = movie.actors.map((actor) => {
            return actor.name;
        });
        this.directors = movie.directors.map((director) => {
            return director.name;
        });
        this.operators = movie.operators.map((operator) => {
            return operator.name;
        });
        this.compositors = movie.compositors.map((compositor) => {
            return compositor.name;
        });
        this.artists = movie.artists.map((artist) => {
            return artist.name;
        });
        this.montages = movie.montages.map((montager) => {
            return montager.name;
        });
        this.scenario = movie.scenario.map((scenarist) => {
            return scenarist.name;
        });
        this.spectators = movie.spectators;
    }
    actors: string[];
    directors: string[];
    operators: string[];
    compositors: string[];
    artists: string[];
    montages: string[];
    scenario: string[];
    spectators: { country: string; count: string }[];
}
