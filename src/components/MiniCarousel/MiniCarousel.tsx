import { IMovie } from '@/types/films.api.interface'
import CustomCarousel from '../CustomCarousel/CustomCarousel'
import style from './MiniCarousel.module.scss'
import { FC } from 'react'
import MiniCarouselItem from './MiniCarouselItem/MiniCarouselItem'
import Link from 'next/link'
import { formatSplitArray } from '@/formatters/splitArray.format'

interface IProps {
  films: IMovie[]
  lines?: number
  className?: string
  autoplay?: boolean
}

const MiniCarousel: FC<IProps> = ({
  films: filmsIncoming,
  lines = 3,
  className = '',
  autoplay = true,
}) => {
  const filmsArraysArray = formatSplitArray(filmsIncoming, lines, {
    evenly: true,
  })

  return (
    <ul className={`${style.wrapper} ${className}`}>
      {filmsArraysArray.map((filmArray, index) => (
        <li key={index}>
          <CustomCarousel
            elementsView={2}
            elementsMove={1}
            space={[8, 8]}
            arrowSize={0}
            speed={1000}
            width='fit'
            autoplay={autoplay}
          >
            {filmArray.map(film => (
              <Link href={`/watch/${film.id}`} key={film.id}>
                <MiniCarouselItem key={film.id} img={film.mainImg} />
              </Link>
            ))}
          </CustomCarousel>
        </li>
      ))}
    </ul>
  )
}

export default MiniCarousel
