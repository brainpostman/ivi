import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect'
import { FC, useRef } from 'react'
import style from './ViewAllBlock.module.scss'

const ViewAllBlock: FC<any> = addElementLen => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const isSelectedRef = useRef(false)

  useIsomorphicLayoutEffect(() => {
    if (!wrapperRef.current || isSelectedRef.current) return

    addElementLen(wrapperRef.current.offsetWidth)
    isSelectedRef.current = true
  }, [wrapperRef])

  return (
    <div className={style.wrapper} ref={wrapperRef}>
      Посмотреть всё
    </div>
  )
}

export default ViewAllBlock
