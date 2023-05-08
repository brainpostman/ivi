import style from './WatchActors.module.scss'
import React, { useState } from 'react'
import WatchModal from '../WatchModal/WatchModal'
import { MdArrowBackIosNew } from 'react-icons/md'
import Image from 'next/image'
import { IMovie } from '@/types/films.api.interface'
import ModalWindow from '../ModalWindow/ModalWindow'
import StaffsWindow from '../StaffsWindow/StaffsWindow'

interface IProps {
  film: IMovie
}

const WatchActors: React.FC<IProps> = ({ film }) => {
  const [isShowModal, setIsShowModal] = useState(false)

  const closeModal = () => setIsShowModal(false)

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        {film.actors.map(actor => (
          <div key={actor.id} className={style.card}>
            <Image
              src='/film/noPhotoIcon60x60.png'
              width={88}
              height={88}
              alt={actor.name}
              className={style.card__img}
            />
            <p className={style.card__name}>{actor.name}</p>
            <p className={style.card__title}>актер</p>
          </div>
        ))}
        <button
          className={style.more_button}
          onClick={() => setIsShowModal(true)}
        >
          Ещё
        </button>
      </div>

      <ModalWindow closeFunc={closeModal} isShow={isShowModal}>
        <StaffsWindow film={film} />
      </ModalWindow>
    </div>
  )
}

export default WatchActors
