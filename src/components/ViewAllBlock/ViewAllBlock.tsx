import { useCustomCarouselContent } from '@/hooks/useCustomCarouselContent'
import { FC } from 'react'
import style from './ViewAllBlock.module.scss'

const ViewAllBlock: FC<any> = addElementLen => {
  const wrapperRef = useCustomCarouselContent(addElementLen)

  return (
    <div className={style.wrapper} ref={wrapperRef}>
      Посмотреть всё
    </div>
  )
}

export default ViewAllBlock
