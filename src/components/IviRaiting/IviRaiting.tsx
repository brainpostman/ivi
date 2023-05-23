import { FC } from 'react'
import SimpleButton from '../UI/SimpleButton/SimpleButton'
import style from './IviRaiting.module.scss'

interface IProps {
  scoreAVG: number
  countScore: number
}

const IviRaiting: FC<IProps> = ({ scoreAVG, countScore }) => {
  return (
    <div className={style.wrapper}>
      <div className={style.wrapper_rating}>
        <div className={style.raiting}>{scoreAVG}</div>
        <div className={style.raiting_info}>
          <h1 className={style.raiting_info__title}>Рейтинг Иви</h1>
          <h4 className={style.raiting_info__subtitle}>Интересный сюжет</h4>
          <h4 className={style.raiting_info__subtitle}>{countScore} оценки</h4>
        </div>
      </div>

      <SimpleButton>Оценить</SimpleButton>
    </div>
  )
}

export default IviRaiting
