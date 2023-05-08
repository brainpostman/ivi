import Image from 'next/image'
import style from './FilmActors.module.scss'
import { IStaff } from '@/types/films.api.interface'
import { FC } from 'react'

interface IProps {
  actors: IStaff[]
}

const FilmActors: FC<IProps> = ({ actors }) => {
  return (
    <div className={style.wrapper}>
      <div className={style.card}>
        <div className={style.wrapper_img}>
          <div className={style.iviRaiting}>
            <h4>8,9</h4>
          </div>
        </div>
        <p className={style.name}>Рейтинг Иви</p>
      </div>
      {actors.map(actor => (
        <div key={actor.id} className={style.card}>
          <div className={style.wrapper_img}>
            <Image
              src='/film/noPhotoIcon44x44.png'
              width={44}
              height={44}
              alt='актер'
              className={style.img}
            />
          </div>
          <p className={style.name}>{actor.name}</p>
        </div>
      ))}
    </div>
  )
}

export default FilmActors
