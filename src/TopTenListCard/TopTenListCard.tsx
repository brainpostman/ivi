import { ITopTenCarouselElem } from '@/types/movieCard.interface'
import Image from 'next/image'
import { FC } from 'react'
import style from './TopTenListCard.module.scss'

const imgNumbers = [
  'https://solea-parent.dfs.ivi.ru/picture/bypass/number1.svg',
  'https://solea-parent.dfs.ivi.ru/picture/bypass/number2.svg',
  'https://solea-parent.dfs.ivi.ru/picture/bypass/number3.svg',
  'https://solea-parent.dfs.ivi.ru/picture/bypass/number4.svg',
  'https://solea-parent.dfs.ivi.ru/picture/bypass/number5.svg',
  'https://solea-parent.dfs.ivi.ru/picture/bypass/number6.svg',
  'https://solea-parent.dfs.ivi.ru/picture/bypass/number7.svg',
  'https://solea-parent.dfs.ivi.ru/picture/bypass/number8.svg',
  'https://solea-parent.dfs.ivi.ru/picture/bypass/number9.svg',
  'https://solea-parent.dfs.ivi.ru/picture/bypass/number10.svg',
]

type IProps = ITopTenCarouselElem & { index: number }

const TopTenListCard: FC<IProps> = movie => {
  return (
    <div className={style.wrapper}>
      <Image src={movie.img} alt={movie.title} width={224} height={457} />

      <Image
        src={imgNumbers[movie.id - 1]}
        alt='number'
        className={style.number}
        width={48}
        height={66}
      />

      <div className={style.shadow}></div>
    </div>
  )
}

export default TopTenListCard
