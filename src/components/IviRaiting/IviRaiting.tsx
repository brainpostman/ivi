import SimpleButton from '../UI/SimpleButton/SimpleButton'
import style from './IviRaiting.module.scss'

const IviRaiting = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.wrapper_rating}>
        <div className={style.raiting}>8,9</div>
        <div className={style.raiting_info}>
          <h1 className={style.raiting_info__title}>Рейтинг Иви</h1>
          <h4 className={style.raiting_info__subtitle}>Интересный сюжет</h4>
          <h4 className={style.raiting_info__subtitle}> 144 953 оценки</h4>
        </div>
      </div>

      <SimpleButton>Оценить</SimpleButton>
    </div>
  )
}

export default IviRaiting
