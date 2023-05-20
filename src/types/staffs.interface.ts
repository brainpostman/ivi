export interface IStaffGetResponse {
  id: number
  name: string
  name_en?: string | null
  biography?: string
  types: [{ name: string }]
}

export type IQuerySuggest = 'director' | 'actor'

export interface IStaff extends Omit<IStaffGetResponse, 'types'> {
  type: IStaffType
}

export type IStaffType =
  | 'actor'
  | 'director'
  | 'artist'
  | 'operator'
  | 'scenario'
  | 'producer'
  | 'compositor'
  | 'montage'

export interface IStaffGetRequest {
  order?: 'ASC' | 'DESC'
  page?: number
  take?: number
  type?: IStaffType
  search?: string
}

export interface IActorGetResponse {
  actor: {
    id: number
    name: string
    biography: string
    types: { id: number; name: string }[]
  }
  films: {
    id: number
    name: string
    name_en: string
    mainImg: string
    year: number
    actors: { id: number; name: string }[]
  }[]
}
