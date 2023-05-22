import { FC, useState } from 'react'
import style from './HeaderMovieBlock.module.scss'
import BasicBtn from '@/components/UI/BasicBtn/BasicBtn'
import { FaTv } from 'react-icons/fa'
import MiniCarousel from '@/components/MiniCarousel/MiniCarousel'
import MiniCarouselIviBlock from '@/components/MiniCarousel/MiniCarouselIviBlock/MiniCarouselIviBlock'
import { IMovie } from '@/types/films.api.interface'

interface IProps {
  isShow?: boolean
  films: IMovie[]
}

const HeaderMovieBlock: FC<IProps> = ({ isShow = true, films }) => {
  const [isHover, setIsHover] = useState(false)

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
        title='Смотреть на SmartTV'
        className={style.watch_tv_button}
        href='https://www.ivi.ru/pages/tvsmart/'
      >
        <FaTv />
      </BasicBtn>
    </div>
  )
}

export default HeaderMovieBlock
