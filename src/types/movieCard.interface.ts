export interface IMovieCard {
  id: number
  img: string
  title: string
  isFree: boolean

  rating: number
  bestIndicator: string
  date: string
  country: string
  genre: string
  duration: string
}

export interface ITopTenCarouselElem {
  id: number
  title: string
  img: string
}
