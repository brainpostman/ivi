import { FC } from 'react'
import style from './CustomCarouselShadows.module.scss'
/*
  * @param {string} classNameRightShadow - класс для правой стрелки
  * @param {string} classNameLeftShadow - класс для левой стрелки

*/

interface IProps {
  classNameRightShadow?: string
  classNameLeftShadow?: string
}

const CustomCarouselShadows: FC<IProps> = ({
  classNameLeftShadow,
  classNameRightShadow,
}) => {
  return (
    <>
      <div
        className={`${style.shadow} ${style.shadow_left} ${classNameLeftShadow}`}
      ></div>
      <div className={`${style.shadow} ${classNameRightShadow}`}></div>
    </>
  )
}

export default CustomCarouselShadows
