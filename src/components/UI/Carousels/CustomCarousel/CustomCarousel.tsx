import { formatCarouselWidth } from '@/formatters/carouselWidth.format'
import { useBreakPoints } from '@/hooks/useBreakPoints'
import { useCustomCarousel } from '@/hooks/useCustomCarousel'
import { useWindow } from '@/hooks/useWindow'
import { ICustomCarouselProps } from '@/types/customCarousel.interface'
import { adaptiveSize } from '@/utils/adaptive.utils'
import Link from 'next/link'
import React, { FC, memo, useRef, useState, useEffect, useMemo } from 'react'
import { MdArrowBackIosNew } from 'react-icons/md'
import style from './CustomCarousel.module.scss'
import CustomCarouselArrows from './CustomCarouselArrows/CustomCarouselArrows'
import CustomCarouselShadows from './CustomCarouselShadows/CustomCarouselShadows'
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect'
import useTouchControls from '@/hooks/useTouchControls'

const CustomCarousel: FC<ICustomCarouselProps> = ({
  elementsMove: elementsMoveIncoming,
  elementsView: elementsViewIncoming,
  title,
  href,
  children,
  additElem,
  classNameList = '',
  classNameWrapper = '',
  arrowSize: arrowSizeIncoming = 32,
  space = [24, 24],
  speed: speedIncoming = 400,
  width = 'full',
  breakpoints,
  padding,
  autoplay = false,
}) => {
  const [items, setItems] = useState<React.ReactNode[]>([])
  const [elementLens, setElementLens] = useState<number[]>([])
  const refs = useRef<(HTMLDivElement | null)[]>([])
  const [elementsView, setElementsView] = useState(elementsViewIncoming)
  const [elementsMove, setElementsMove] = useState(elementsMoveIncoming)
  const [gap, setGap] = useState(space[0])
  const [arrowSize, setArrowSize] = useState(arrowSizeIncoming)

  const [speed, setSpeed] = useState(speedIncoming)

  const [containerWidth, setContainerWidth] = useState(0)
  const [autoplayMove, setAutoplayMove] = useState(0)

  const arrowPosition =
    width === 'fit-shadow' ? arrowSizeIncoming - 4 : arrowSizeIncoming + 4

  const { onClickRightArrow, onClickLeftArrow, viewArrow, move } =
    useCustomCarousel(elementLens, elementsView, elementsMove)

  const { onTouchStart, onTouchMove } = useTouchControls(
    onClickLeftArrow,
    onClickRightArrow
  )

  const translate = `translate3d(-${autoplay ? autoplayMove : move}px, 0, 0)`

  const pushRef = (ref: HTMLDivElement | null) => {
    const maxLen = additElem ? children.length + 1 : children.length
    if (ref === null || !children || refs.current.length >= maxLen) return

    refs.current.push(ref)
  }

  const setterElements = () => {
    setElementLens(() => {
      const arrayLen = refs.current.map(ref =>
        ref ? ref.offsetWidth + gap : 0
      )
      return arrayLen
    })
  }

  const setterGap = () => {
    setGap(() => adaptiveSize(space[0], space[1], 600))
  }

  const setterArrowSize = () => {
    setArrowSize(() => adaptiveSize(arrowSizeIncoming, 20))
  }

  // Действия при изменении ширины экрана (адаптив)
  useWindow(setterElements, [refs, setElementLens, elementsView, gap])
  useWindow(setterGap, [setGap])
  useWindow(setterArrowSize, [setArrowSize])

  // Брейкпоинты
  useBreakPoints(setElementsView, elementsView, breakpoints)

  // Изменение кол-ва передвигаемых элементов
  useEffect(() => {
    if (elementsView === elementsViewIncoming) {
      setElementsMove(elementsMoveIncoming)
      return
    }

    const ratio = elementsMoveIncoming / elementsViewIncoming
    setElementsMove(Math.round(elementsView * ratio))
  }, [elementsView])

  // Container width
  useEffect(() => {
    const newContainerWidth =
      formatCarouselWidth(width, gap, padding, elementLens, elementsView) || 0

    setContainerWidth(newContainerWidth)
  }, [width, gap, padding, elementLens, elementsView, items])

  // Ререндер при изменении elementsViewIncoming
  useEffect(() => {
    setElementsView(elementsViewIncoming)
  }, [elementsViewIncoming])

  // Ререндер при изменении arrowSizeIncoming
  useEffect(() => {
    setArrowSize(arrowSizeIncoming)
  }, [arrowSizeIncoming])

  // Ререндер при изменении space
  useEffect(() => {
    setGap(space[0])
  }, [space])

  // Сетаем элементы карусели
  useIsomorphicLayoutEffect(() => {
    if (Array.isArray(children)) {
      setItems(children)
    }
  }, [children])

  // Autoplay
  useEffect(() => {
    if (!autoplay) return

    const countLastLengths = 1

    const interval = setInterval(() => {
      const copyItems = [...items]

      const itemsFirstEls = copyItems.slice(0, countLastLengths + 1)

      const itemsWithoutFirstEls = copyItems.slice(
        countLastLengths - 1,
        copyItems.length
      )

      const newItems = [...itemsWithoutFirstEls, ...itemsFirstEls]
      setSpeed(prev => prev + speedIncoming)
      setAutoplayMove(prev => prev + containerWidth)

      setItems(newItems)
    }, speedIncoming)

    return () => clearInterval(interval)
  }, [items, autoplay])

  useEffect(() => {
    if (!autoplay) {
      setSpeed(speedIncoming)
      return
    }

    setAutoplayMove(prev => prev + containerWidth)
    setSpeed(prev => prev + speedIncoming)
  }, [containerWidth, autoplay, speedIncoming])

  // Element lengths
  useEffect(() => {
    setterElements()
  }, [children])

  return (
    <article
      className={`${style.wrapper} ${classNameWrapper}`}
      style={{ width: containerWidth }}
    >
      {title && href && (
        <Link href={href} className={style.wrapperTitle}>
          <p>{title}</p>
          <MdArrowBackIosNew />
        </Link>
      )}

      <div className={style.wrapperCarousel}>
        <div className={style.container} style={{ width: containerWidth }}>
          <div
            className={`${style.list} ${classNameList}`}
            style={{
              transform: translate,
              gap: `${gap}px`,
              transitionDuration: `${speed}ms`,
              padding,
            }}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
          >
            {Array.isArray(items) &&
              items.map((element, index) => (
                <div
                  key={index}
                  ref={ref => {
                    if (!ref) return
                    pushRef(ref)
                  }}
                >
                  {element}
                </div>
              ))}
            {additElem && (
              <div
                ref={ref => {
                  if (!ref) return
                  pushRef(ref)
                }}
              >
                {additElem}
              </div>
            )}
          </div>
          <CustomCarouselArrows
            arrowSize={arrowSize}
            arrowPosition={arrowPosition}
            classNameLeftArrow={viewArrow('left')}
            classNameRightArrow={viewArrow('right')}
            onClickLeftArrow={onClickLeftArrow}
            onClickRightArrow={onClickRightArrow}
          />
          {width === 'fit-shadow' && (
            <CustomCarouselShadows
              classNameLeftShadow={viewArrow('left')}
              classNameRightShadow={viewArrow('right')}
            />
          )}
        </div>
      </div>
    </article>
  )
}

export default memo(CustomCarousel)
