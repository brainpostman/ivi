import Image from 'next/image'
import style from './TrailerBlock.module.scss'
import { FC } from 'react'
import { BsPlay } from 'react-icons/bs'
import BasicBtn from '../UI/BasicBtn/BasicBtn'
import { BsBookmark } from 'react-icons/bs'
import { RiShareForwardLine } from 'react-icons/ri'
import { BsCollectionPlay } from 'react-icons/bs'

interface IProps {
  mainImg: string
}

const TrailerBlock: FC<IProps> = ({ mainImg }) => {
  return (
    <div className={style.wrapper}>
      <div className={style.wrapper_img}>
        <Image
          src={mainImg}
          width={719}
          height={404}
          alt='трейлер'
          className={style.main_img}
        />
      </div>
      <div className={style.buttons}>
        <div className={style.buttons__left_side}>
          <BasicBtn btnType='textPlusIcon' title='Трейлер'>
            <BsPlay className={style.trailer_icon} />
          </BasicBtn>
          <BasicBtn btnType='icon'>
            <BsBookmark />
          </BasicBtn>
          <BasicBtn btnType='icon'>
            <RiShareForwardLine />
          </BasicBtn>
        </div>
        <BasicBtn btnType='textPlusIcon' title='Бесплатные фильмы'>
          <BsCollectionPlay />
        </BasicBtn>
      </div>
    </div>
  )
}

export default TrailerBlock
