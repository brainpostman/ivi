import { BsBookmark, BsCollectionPlay, BsPlay } from 'react-icons/bs'
import BasicBtn from '../../UI/Buttons/BasicBtn/BasicBtn'
import style from './TrailerButtons.module.scss'
import { RiShareForwardLine } from 'react-icons/ri'
import { FC } from 'react'
import { useTranslation } from 'next-i18next'

interface IProps {
  className?: string
}

const TrailerButtons: FC<IProps> = ({ className = '' }) => {
  const { t } = useTranslation('watch', { keyPrefix: 'trailer-block' })
  return (
    <div className={`${style.buttons} ${className}`}>
      <div className={style.buttons__left_side}>
        <BasicBtn btnType='icon' title={t('trailer')} dark>
          <BsPlay className={style.trailer_icon} />
        </BasicBtn>
        <BasicBtn btnType='icon' dark>
          <BsBookmark />
        </BasicBtn>
        <BasicBtn btnType='icon' dark>
          <RiShareForwardLine />
        </BasicBtn>
      </div>
      <BasicBtn btnType='icon' title={t('free-movies')} dark>
        <BsCollectionPlay />
      </BasicBtn>
    </div>
  )
}

export default TrailerButtons
