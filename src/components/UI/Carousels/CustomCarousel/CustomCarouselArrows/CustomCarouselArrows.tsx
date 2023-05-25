import { useWindow } from '@/hooks/useWindow'
import { adaptiveSize } from '@/utils/adaptive.utils'
import { FC, useState } from 'react'
import { MdArrowBackIosNew } from 'react-icons/md'
import style from './CustomCarouselArrows.module.scss'

/*
 * @param {number} arrowSize - размер стрелки
 * @param {number} arrowPosition - отступ стрелки
 * @param {string} classNameRightArrow - класс для правой стрелки
 * @param {string} classNameLeftArrow - класс для левой стрелки
 * @param {() => void} onClickLeftArrow - действие по клику на левую стрелку
 * @param {() => void} onClickRightArrow - действие по клику на правую стрелку

*/

interface IProps {
  arrowSize: number
  arrowPosition: number
  classNameRightArrow?: string
  classNameLeftArrow?: string
  onClickLeftArrow?: () => void
  onClickRightArrow?: () => void
}

const CustomCarouselArrows: FC<IProps> = ({
  arrowSize,
  classNameRightArrow,
  classNameLeftArrow,
  onClickLeftArrow,
  onClickRightArrow,
  arrowPosition: arrowPositionIncoming,
}) => {
  const [arrowPosition, setArrowPosition] = useState(arrowPositionIncoming)

  const setterArrowPosition = () => {
    setArrowPosition(() =>
      adaptiveSize(arrowPositionIncoming, arrowPositionIncoming, 320, 1270)
    )
  }

  useWindow(setterArrowPosition, [setArrowPosition])
  return (
    <div className={style.arrows}>
      <div
        onClick={onClickLeftArrow}
        className={classNameLeftArrow}
        style={{ left: `-${arrowPosition}px` }}
      >
        <MdArrowBackIosNew style={{ width: arrowSize, height: arrowSize }} />
      </div>
      <div
        onClick={onClickRightArrow}
        className={classNameRightArrow}
        style={{ right: `-${arrowPosition}px` }}
      >
        <MdArrowBackIosNew style={{ width: arrowSize, height: arrowSize }} />
      </div>
    </div>
  )
}

export default CustomCarouselArrows
