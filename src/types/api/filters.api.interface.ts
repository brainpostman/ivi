export interface IFilterGetResponse {
  id: number
  name: string
}

export type IFilter = 'genres' | 'countries' | 'actors' | 'directors'
export type IFilterHeader = 'genres' | 'countries'
