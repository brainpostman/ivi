import { FC } from 'react'
import style from './WatchReviews.module.scss'
import SimpleButton from '../UI/SimpleButton/SimpleButton'

interface IProps {
  filmName: string
}

const WatchReviews: FC<IProps> = ({ filmName }) => {
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.title}>
          <p>Отзывы</p>
          <span className={style.quantity}>383</span>
          <p className={style.subtitle}>о фильме &#171;{filmName}&#187;</p>
        </div>
        <SimpleButton>Оставить отзыв</SimpleButton>
      </div>

      <div>{/*здесь компонет с коментами*/}</div>
    </div>
  )
}

export default WatchReviews
