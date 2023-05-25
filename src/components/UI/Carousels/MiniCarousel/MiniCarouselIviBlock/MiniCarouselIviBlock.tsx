import style from './MiniCarouselIviBlock.module.scss'
import { FC } from 'react'
import HighlightButton from '@/components/UI/Buttons/HighlightButton/HighlightButton'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'

interface IProps {
  className?: string
  isHover: boolean
}

const MiniCarouselIviBlock: FC<IProps> = ({ className = '', isHover }) => {
  const additClassNameMainBlock = isHover ? style.move_up : ''
  const additClassNameHoverBlock = isHover ? style.view : ''

  const { t } = useTranslation('header', {
    keyPrefix: 'right-side.profile-block.movie-block',
  })

  return (
    <div className={`${style.wrapper} ${className}`}>
      <div className={`${style.main_block} ${additClassNameMainBlock}`}>
        <div className={style.logo}></div>
        <div>
          <p className={style.title}>{t('subscription')}</p>
          <p className={style.subtitle}>{t('payment')}</p>
        </div>
      </div>

      <div className={`${style.hover_block} ${additClassNameHoverBlock}`}>
        <Link href='https://www.ivi.ru/profile/subscription'>
          <HighlightButton>{t('connect')}</HighlightButton>
        </Link>
        <p className={style.small_info}>{t('turn-off')}</p>
      </div>
    </div>
  )
}

export default MiniCarouselIviBlock
