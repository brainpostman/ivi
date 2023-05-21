import { FC, useContext, useState } from 'react'
import style from './HeaderMovieBlock.module.scss'
import BasicBtn from '@/components/UI/BasicBtn/BasicBtn'
import { FaTv } from 'react-icons/fa'
import MiniCarousel from '@/components/MiniCarousel/MiniCarousel'
import { FilmsContext } from '@/contexts/films.context'
import MiniCarouselIviBlock from '@/components/MiniCarousel/MiniCarouselIviBlock/MiniCarouselIviBlock'

interface IProps {
  isShow?: boolean
}

const HeaderMovieBlock: FC<IProps> = ({ isShow = true }) => {
  const { films } = useContext(FilmsContext)
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
