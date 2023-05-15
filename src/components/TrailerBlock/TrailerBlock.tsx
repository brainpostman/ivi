import Image from 'next/image'
import style from './TrailerBlock.module.scss'
import { FC } from 'react'
import TrailerButtons from './TrailerButtons/TrailerButtons'
import { IStaffGetResponse } from '@/types/staffs.interface'
import FilmActors from '../FilmActors/FilmActors'
import BasicBtn from '../UI/BasicBtn/BasicBtn'
import { BsCollectionPlay } from 'react-icons/bs'

interface IProps {
  mainImg: string
  actors: IStaffGetResponse[]
}

const TrailerBlock: FC<IProps> = ({ mainImg, actors }) => {
  return (
    <div className={style.wrapper}>
      <div className={style.wrapper_img}>
        <Image src={mainImg} alt='трейлер' className={style.main_img} fill />
      </div>
      <TrailerButtons className={style.trailer_buttons_pc} />

      <div className={style.under_trailer_mobile}>
        <div>
          <FilmActors actors={actors} className={style.film_actors_mobile} />
          {/*MOBILE FREE FILMS BUTTON*/}
          <BasicBtn
            btnType='textPlusIcon'
            title='Бесплатные фильмы'
            className={style.button_free_films}
            dark
          >
            <BsCollectionPlay />
          </BasicBtn>
        </div>
        {/*MOBILE TRAILER BUTTONS*/}
        <TrailerButtons className={style.trailer_buttons_mobile} />
      </div>
    </div>
  )
}

export default TrailerBlock
