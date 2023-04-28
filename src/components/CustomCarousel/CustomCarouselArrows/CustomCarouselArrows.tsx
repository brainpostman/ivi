import { useWindow } from '@/hooks/useWindow'
import { adaptiveSize } from '@/utils/adaptive.utils'
import { FC, useState } from 'react'
import { MdArrowBackIosNew } from 'react-icons/md'
import style from './CustomCarouselArrows.module.scss'

// ==== PROPS ====
// @param { * } arrowSize - размер стрелки
// @param { * } arrowPosition - отступ стрелки
// @param classNameRightArrow - класс для правой стрелки
// @param classNameLeftArrow - класс для левой стрелки
// @param onClickLeftArrow - действие по клику на левую стрелку
// @param onClickRightArrow - действие по клику на правую стрелку

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
    setArrowPosition(() => adaptiveSize(arrowPositionIncoming, 8))
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
