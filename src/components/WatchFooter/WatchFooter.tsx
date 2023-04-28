import React from 'react'
import HighlightButton from '../UI/HighlightButton/HighlightButton'
import style from './WatchFooter.module.scss'

export default function WatchFooter() {
  return (
    <div className={style.conteiner}>
        <div className={style.info}>
            <h2 className={style.info_title}>Cмотреть «1+1» на всех устройствах</h2>
            <p className={style.info_subtitle}>Приложение доступно для скачивания на iOS, Android, SmartTV и приставках</p>
            <HighlightButton>Подключить устройства</HighlightButton>
        </div>

        <div className={style.images}>
            <img className={style.images_tv} src='https://www.ivi.ru/images/_ds/watchAllDevices/tv-without-poster.png'alt='Устройства для просмотра иви'/>
            <img className={style.images_tablet} src='https://www.ivi.ru/images/_ds/watchAllDevices/ipad-without-poster.png'alt='Устройства для просмотра иви'/>
            <img className={style.images_tv_poster} src='https://thumbs.dfs.ivi.ru/storage8/contents/0/e/8091320a67fabb8119ac00fdc386c5.jpg/400x226/'alt='Постер 1+1'/>
            <img className={style.images_tablet_poster} src='https://thumbs.dfs.ivi.ru/storage8/contents/0/e/8091320a67fabb8119ac00fdc386c5.jpg/400x226/' alt='Постер 1+1'/>
        </div>
    </div>
  )
}
