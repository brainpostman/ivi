import style from './WatchActors.module.scss'
import React, { useState } from 'react'
import Image from 'next/image'
import { IMovieById } from '@/types/films.api.interface'
import ModalWindow from '../ModalWindow/ModalWindow'
import StaffsWindow from '../StaffsWindow/StaffsWindow'
import { useBreakPoints } from '@/hooks/useBreakPoints'
import Link from 'next/link'

const breakpoints = [
  { point: 1160, view: 8 },
  { point: 1060, view: 7 },
  { point: 948, view: 6 },
  { point: 835, view: 5 },
  { point: 724, view: 4 },
  { point: 612, view: 3 },
  { point: 599, view: 5 },
  { point: 580, view: 4 },
  { point: 472, view: 3 },
  { point: 385, view: 2 },
]

interface IProps {
  film: IMovieById
}

const WatchActors: React.FC<IProps> = ({ film }) => {
  const [isShowModal, setIsShowModal] = useState(false)
  const [staffsView, setStaffsView] = useState(10)

  const closeModal = () => setIsShowModal(false)

  useBreakPoints(setStaffsView, 10, breakpoints)

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        {film.actors.slice(0, staffsView).map(actor => (
          <Link href={`/person/${actor.id}`}>
            <div key={actor.id} className={style.card}>
              <div className={style.person_img_wrapper}>
                <Image
                  src='/film/noPhotoIcon60x60.png'
                  alt={actor.name}
                  className={style.card__img}
                  fill
                />
              </div>
              <p className={style.card__name}>{actor.name}</p>
              <p className={style.card__title}>актер</p>
            </div>
          </Link>
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
