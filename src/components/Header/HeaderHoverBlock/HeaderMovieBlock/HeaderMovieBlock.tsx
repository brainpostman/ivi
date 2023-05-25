import { FC, useState } from 'react'
import style from './HeaderMovieBlock.module.scss'
import BasicBtn from '@/components/UI/Buttons/BasicBtn/BasicBtn'
import { FaTv } from 'react-icons/fa'
import MiniCarousel from '@/components/UI/Carousels/MiniCarousel/MiniCarousel'
import MiniCarouselIviBlock from '@/components/UI/Carousels/MiniCarousel/MiniCarouselIviBlock/MiniCarouselIviBlock'
import { IMovie } from '@/types/api/films.api.interface'
import { useTranslation } from 'next-i18next'

interface IProps {
  isShow?: boolean
  films: IMovie[]
}

const HeaderMovieBlock: FC<IProps> = ({ isShow = true, films }) => {
  const [isHover, setIsHover] = useState(false)

  const { t } = useTranslation('header', {
    keyPrefix: 'right-side.profile-block.movie-block',
  })

  if (!isShow) return <></>

  return (
    <div className={style.wrapper}>
      <div
        className={style.wrapper_carousel}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <MiniCarousel films={films} className={style.carousel} />
        <MiniCarouselIviBlock isHover={isHover} className={style.ivi_block} />
      </div>

      <BasicBtn
        btnType='icon'
        title={t('watch-on-smart-tv')}
        className={style.watch_tv_button}
        href='https://www.ivi.ru/pages/tvsmart/'
      >
        <FaTv />
      </BasicBtn>
    </div>
  )
}

export default HeaderMovieBlock
