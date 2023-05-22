import { FC } from 'react'
import style from './MiniCarouselItem.module.scss'
import Image from 'next/image'

interface IProps {
  img: string
}

const MiniCarouselItem: FC<IProps> = ({ img }) => {
  return (
    <div className={style.wrapper}>
      <Image src={img} alt='film' fill loading='eager' />
    </div>
  )
}

export default MiniCarouselItem
