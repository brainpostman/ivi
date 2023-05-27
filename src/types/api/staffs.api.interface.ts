export interface IStaffGetResponse {
  id: number
  img?: string
  name: string
  name_en?: string | null
  biography?: string
  types: [{ name: string }]
}

export type IQuerySuggest = 'directors' | 'actors'

export interface IStaff extends Omit<IStaffGetResponse, 'types'> {
  type: IStaffType
}

export interface IStaffByParamsGetRequest
  extends Omit<IStaffGetRequest, 'type'> {
  type: IQuerySuggest
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
