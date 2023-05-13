import React, { FC } from 'react'
import HighlightButton from '../UI/HighlightButton/HighlightButton'
import style from './WatchFooter.module.scss'
import Image from 'next/image'

interface IProps {
  filmName: string
  mainImg: string
}

const WatchFooter: FC<IProps> = ({ filmName, mainImg }) => {
  return (
    <div className={style.wrapper}>
      <div className={style.info}>
        <h2 className={style.info__title}>
          Cмотреть {filmName} на всех устройствах
        </h2>
        <p className={style.info__subtitle}>
          Приложение доступно для скачивания на iOS, Android, SmartTV и
          приставках
        </p>
        <HighlightButton>Подключить устройства</HighlightButton>
      </div>

      <div className={style.images}>
        <Image
          className={style.images__tv}
          src='https://www.ivi.ru/images/_ds/watchAllDevices/tv-without-poster.png'
          width={1072}
          height={544}
          alt='Устройства для просмотра иви'
        />
        <Image
          className={style.images__tablet}
          src='https://www.ivi.ru/images/_ds/watchAllDevices/ipad-without-poster.png'
          width={400}
          height={272}
          alt='Устройства для просмотра иви'
        />
        <Image
          className={style.images__tv_poster}
          src={mainImg}
          width={400}
          height={226}
          alt='Постер'
        />
        <Image
          className={style.images__tablet_poster}
          src={mainImg}
          width={400}
          height={226}
          alt='Постер'
        />
      </div>
    </div>
  )
}

export default WatchFooter
