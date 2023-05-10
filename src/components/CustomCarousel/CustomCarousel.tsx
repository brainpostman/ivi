import { formatCarouselWidth } from '@/formatters/carouselWidth.format'
import { useBreakPoints } from '@/hooks/useBreakPoints'
import { useCustomCarousel } from '@/hooks/useCustomCarousel'
import { useWindow } from '@/hooks/useWindow'
import { ICustomCarouselProps } from '@/types/customCarousel.interface'
import { adaptiveSize } from '@/utils/adaptive.utils'
import Link from 'next/link'
import React, { FC, memo, useRef, useState, useEffect } from 'react'
import { MdArrowBackIosNew } from 'react-icons/md'
import style from './CustomCarousel.module.scss'
import CustomCarouselArrows from './CustomCarouselArrows/CustomCarouselArrows'
import CustomCarouselShadows from './CustomCarouselShadows/CustomCarouselShadows'

// ==== PROPS ====
// @param { * } elementsView - количество элементов, которые отображаются в карусели (указываем на 1 элемент меньше)
// @param { * } elemntsMove - количество элементов, на которое мы двигаем карусель
// @param { * } children -
// @param title - заголовок карусели
// @param href - ссылка в заголовке
// @param additElem - допольнительный элемент
// @param classNameList - класс для списка элементов
// @param classNameWrapper - класс для обёртки
// @param arrowSize - размер стрелок
// @param space - адаптивный отступ между элементами: [начальный отступ, коненчный отступ]
// @param speed - скорость анимации движения
// @param width - ширина ограничивающего контейнера
// 'full' - 1225px; 'fit' - ограничивается по elementsView; 'fit-shadow' - добавляется тень + контейнер увеличивается на половину следующего элемента
// @param breakpoints - брейкпоинты
// при достижении брейкпоинта @param elementsView уменьшается на 1
// @param padding (костыль) - допольнительный отступ

const CustomCarousel: FC<ICustomCarouselProps> = ({
  elementsMove,
  elementsView: elementsViewIncoming,
  title,
  href,
  children,
  additElem,
  classNameList,
  classNameWrapper,
  arrowSize: arrowSizeIncoming = 32,
  space = [24, 24],
  speed = 400,
  width = 'full',
  breakpoints,
  padding,
}) => {
  const [elementLens, setElementLens] = useState<number[]>([])
  const refs = useRef<(HTMLDivElement | null)[]>([])
  const [elementsView, setElementsView] = useState(elementsViewIncoming)
  const [gap, setGap] = useState(space[0])
  const [arrowSize, setArrowSize] = useState(arrowSizeIncoming)

  const containerWidth = formatCarouselWidth(
    width,
    elementLens,
    elementsView,
    gap,
    padding
  )

  const arrowPosition =
    width === 'fit-shadow' ? arrowSizeIncoming - 4 : arrowSizeIncoming + 4

  const { onClickRightArrow, onClickLeftArrow, viewArrow, move } =
    useCustomCarousel(elementLens, elementsView, elementsMove)

  const translate = `translate3d(-${move}px, 0, 0)`

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
          >
            {Array.isArray(children) &&
              children.map((element, index) => (
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
