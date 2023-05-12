export interface IStaffGetResponse {
  id: number
  name: string
  name_en?: string | null
}

export interface IFilterGetResponse {
  id: number
  name: string
}

export interface IStaffGetRequest {
  order?: 'ASC' | 'DESC'
  page?: number
  take?: number
  type?:
    | 'actor'
    | 'director'
    | 'artist'
    | 'operator'
    | 'scenario'
    | 'producer'
    | 'compositor'
    | 'montage'
}
