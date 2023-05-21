import Image from 'next/image'
import style from './MiniCarouselIviBlock.module.scss'
import { FC, useState } from 'react'
import HighlightButton from '@/components/UI/HighlightButton/HighlightButton'
import Link from 'next/link'

interface IProps {
  className?: string
  isHover: boolean
}

const MiniCarouselIviBlock: FC<IProps> = ({ className = '', isHover }) => {
  const additClassNameMainBlock = isHover ? style.move_up : ''
  const additClassNameHoverBlock = isHover ? style.view : ''

  return (
    <div className={`${style.wrapper} ${className}`}>
      <div className={`${style.main_block} ${additClassNameMainBlock}`}>
        <div className={style.logo}></div>
        <div>
          <p className={style.title}>Подписка Иви</p>
          <p className={style.subtitle}>От 199 ₽ за месяц</p>
        </div>
      </div>

      <div className={`${style.hover_block} ${additClassNameHoverBlock}`}>
        <Link href='https://www.ivi.ru/profile/subscription'>
          <HighlightButton>Подключить</HighlightButton>
        </Link>
        <p className={style.small_info}>Отключить можно в любой момент</p>
      </div>
    </div>
  )
}

export default MiniCarouselIviBlock
