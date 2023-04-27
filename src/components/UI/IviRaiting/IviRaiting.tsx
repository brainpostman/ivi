import style from './IviRaiting.module.scss'

export default function IviRaiting() {
  return (
    <div className={style.wrapper}>
        <div className={style.raiting_img}>
            <div className={style.raiting_value}>8,9</div>
        </div>

        <div className={style.raiting_info}>
            <h3 className={style.raiting_info_title}>Рейтинг Иви</h3>
            <h4 className={style.raiting_info_title}>Интересный сюжет</h4>
            <h4 className={style.raiting_info_title}> 144 953 оценки</h4>
        </div>

        <button className={style.raiting_button}><div className={style.raiting_button_text}>Оценить</div></button>
    </div>
  )
}
