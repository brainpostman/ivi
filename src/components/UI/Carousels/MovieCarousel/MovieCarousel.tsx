import { FC } from 'react'
import CustomCarousel from '../CustomCarousel/CustomCarousel'
import style from './MovieCarousel.module.scss'
import { ICustomCarouselProps } from '@/types/customCarousel.interface'
import { IMovie } from '@/types/api/films.api.interface'
import MovieCard from '../../Cards/MovieCard/MovieCard'
import GrayBlock from '@/components/UI/GrayBlock/GrayBlock'

type IProps = Omit<
  ICustomCarouselProps,
  'elementsMove' | 'elementsView' | 'children'
> & {
  elementsMove?: number
  elementsView?: number
  films: IMovie[]
}

const breakpoints = [
  { point: 1272, view: 6 },
  { point: 1096, view: 5 },
  { point: 920, view: 4 },
  { point: 744, view: 3 },
  { point: 599, view: 4 },
  { point: 512, view: 3 },
  { point: 392, view: 2 },
]

const MovieCarousel: FC<IProps> = ({ films, ...props }) => {
  return (
    <CustomCarousel
      additElem={<GrayBlock>Посмотреть все</GrayBlock>}
      elementsMove={5}
      elementsView={7}
      space={[24, 24]}
      breakpoints={breakpoints}
      classNameList={style.movie_carousel_list}
      padding={6}
      speed={700}
      width='fit'
      {...props}
    >
      {films.map(movie => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </CustomCarousel>
  )
}

export default MovieCarousel
