import { BsBookmark, BsCollectionPlay, BsPlay } from 'react-icons/bs'
import BasicBtn from '../../UI/BasicBtn/BasicBtn'
import style from './TrailerButtons.module.scss'
import { RiShareForwardLine } from 'react-icons/ri'
import { FC } from 'react'

interface IProps {
  className?: string
}

const TrailerButtons: FC<IProps> = ({ className = '' }) => {
  return (
    <div className={`${style.buttons} ${className}`}>
      <div className={style.buttons__left_side}>
        <BasicBtn btnType='textPlusIcon' title='Трейлер' dark>
          <BsPlay className={style.trailer_icon} />
        </BasicBtn>
        <BasicBtn btnType='icon' dark>
          <BsBookmark />
        </BasicBtn>
        <BasicBtn btnType='icon' dark>
          <RiShareForwardLine />
        </BasicBtn>
      </div>
      <BasicBtn btnType='textPlusIcon' title='Бесплатные фильмы' dark>
        <BsCollectionPlay />
      </BasicBtn>
    </div>
  )
}

export default TrailerButtons
