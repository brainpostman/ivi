import { FC } from 'react'
import { ITopTenCarouselElem } from '@/types/movieCard.interface'
import Image from 'next/image'
import style from './TopTenListCard.module.scss'
import { topTenListImgNumbers } from '@/data/topTenList.data'

type IProps = Omit<ITopTenCarouselElem, 'id'> & { index: number }

const TopTenListCard: FC<IProps> = ({ img, index }) => {
  console.log(index)

  return (
    <div className={style.wrapper}>
      <div className={style.wrapper_img}>
        <Image src={img} alt='topTen' className={style.img} fill />
      </div>

      <Image
        src={topTenListImgNumbers[index]}
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
