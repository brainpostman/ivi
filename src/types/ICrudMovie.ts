export interface ICRUDGenre {
  id: number
  name: string
  name_en: string
  createdAt: string
  updatedAt: string
  FilmGenres?: {
    id: number
    filmId: number
    genreId: number
  }
}

interface ICRUDCountry {
  id: number
  name: string
  fk_countryid: number | null
  createdAt: string
  updatedAt: string
  FilmCountries: {
    id: number
    filmId: number
    countryId: number
  }
}

interface ICRUDStaffer {
  id: number
  name: string
  biography: string
  createdAt: string
  updatedAt: string
}

interface ICRUDStafferInMovie {
  id: number
  filmId: number
  staffId: number
}

export interface ICRUDMovie {
  id: number
  name: string
  name_en: string
  type: string | null
  mainImg: string | null
  year: number | null
  tagline: string | null
  budget: string | null
  fees: string | null
  feesUS: string | null
  feesRU: string | null
  premiere: string | null
  premiereRU: string | null
  releaseDVD: string | null
  releaseBluRay: string | null
  age: string | null
  ratingMPAA: string | null
  time: string | null
  description: string | null
  scoreAVG: number | null
  createdAt: string
  updatedAt: string
  countries: ICRUDCountry[]
  genres: ICRUDGenre[]
}

export interface ICRUDDetailedMovie extends ICRUDMovie {
  actors: ({
    FilmActors: ICRUDStafferInMovie
  } & ICRUDStaffer)[]
  directors: ({
    FilmDirectors: ICRUDStafferInMovie
  } & ICRUDStaffer)[]
  operators: ({
    FilmOperators: ICRUDStafferInMovie
  } & ICRUDStaffer)[]
  compositors: ({
    FilmCompositors: ICRUDStafferInMovie
  } & ICRUDStaffer)[]
  artists: ({
    FilmArtists: ICRUDStafferInMovie
  } & ICRUDStaffer)[]
  montages: ({
    FilmMontages: ICRUDStafferInMovie
  } & ICRUDStaffer)[]
  scenario: ({
    FilmScenario: ICRUDStafferInMovie
  } & ICRUDStaffer)[]
  spectators: {
    country: string
    count: string
  }[]
}

export interface ICRUDDetailedMovieRequest
  extends Omit<
    ICRUDDetailedMovie,
    | 'genres'
    | 'countries'
    | 'actors'
    | 'directors'
    | 'operators'
    | 'compositors'
    | 'artists'
    | 'montages'
    | 'scenario'
    | 'createdAt'
    | 'updatedAt'
  > {
  genres: { id: number; name: string; name_en: string }[]
  countries: string[]
  actors: string[]
  directors: string[]
  operators: string[]
  compositors: string[]
  artists: string[]
  montages: string[]
  scenario: string[]
}

export class CRUDDetailedMovieRequest implements ICRUDDetailedMovieRequest {
  constructor(movie: ICRUDDetailedMovie) {
    this.genres = movie.genres.map(genre => {
      return {
        id: genre.id,
        name: genre.name,
        name_en: genre.name_en,
      }
    })
    this.countries = movie.countries.map(country => {
      return country.name
    })
    this.actors = movie.actors.map(actor => {
      return actor.name
    })
    this.directors = movie.directors.map(director => {
      return director.name
    })
    this.operators = movie.operators.map(operator => {
      return operator.name
    })
    this.compositors = movie.compositors.map(composer => {
      return composer.name
    })
    this.artists = movie.artists.map(artist => {
      return artist.name
    })
    this.montages = movie.montages.map(editor => {
      return editor.name
    })
    this.scenario = movie.scenario.map(writer => {
      return writer.name
    })
    this.spectators = movie.spectators
    this.id = movie.id
    this.name = movie.name
    this.name_en = movie.name_en
    this.type = movie.type
    this.mainImg = movie.mainImg
    this.year = movie.year
    this.tagline = movie.tagline
    this.budget = movie.budget
    this.fees = movie.fees
    this.feesUS = movie.feesUS
    this.feesRU = movie.feesRU
    this.premiere = movie.premiere
    this.premiereRU = movie.premiereRU
    this.releaseDVD = movie.releaseDVD
    this.releaseBluRay = movie.releaseBluRay
    this.age = movie.age
    this.ratingMPAA = movie.ratingMPAA
    this.time = movie.time
    this.description = movie.description
    this.scoreAVG = movie.scoreAVG
  }
  genres: { id: number; name: string; name_en: string }[]
  countries: string[]
  actors: string[]
  directors: string[]
  operators: string[]
  compositors: string[]
  artists: string[]
  montages: string[]
  scenario: string[]
  spectators: { country: string; count: string }[]
  id: number
  name: string
  name_en: string
  type: string | null
  mainImg: string | null
  year: number | null
  tagline: string | null
  budget: string | null
  fees: string | null
  feesUS: string | null
  feesRU: string | null
  premiere: string | null
  premiereRU: string | null
  releaseDVD: string | null
  releaseBluRay: string | null
  age: string | null
  ratingMPAA: string | null
  time: string | null
  description: string | null
  scoreAVG: number | null
}
