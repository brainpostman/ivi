import { useBreakPoints } from '@/hooks/useBreakPoints'
import { useCustomCarousel } from '@/hooks/useCustomCarousel'
import { useWindow } from '@/hooks/useWindow'
import { Url } from 'next/dist/shared/lib/router/router'
import Link from 'next/link'
import React, { FC, memo, useEffect, useRef, useState } from 'react'
import { MdArrowBackIosNew } from 'react-icons/md'
import style from './CustomCarousel.module.scss'

// @elementsView - Количество элементов, которые отображаются в карусели (указываем на 1 элемент меньше)
// @elemntsMove - Количество элементов, на которое мы двигаем карусель
// @elementLen - полная длина элемента, включая отступ
// @blockList - данные для элементов карусели

type IWidth = 'full' | 'fit' | 'fit-shadow'

interface IProps {
  elementsView: number
  elementsMove: number
  title?: string
  href?: Url
  children: React.ReactNode[]
  additElem?: () => JSX.Element
  classNameList?: string
  classNameWrapper?: string
  arrowSize?: number
  space?: number
  speed?: number
  width?: IWidth
  breakpoints?: number[]
}

const formatWidth = (
  width: IWidth,
  elementLens: number[],
  elementsView: number,
  space: number
) => {
  if (width === 'full') return 1225

  const resultWidth =
    elementLens
      .slice(0, elementsView)
      .reduce((accum, item) => accum + item, 0) - space

  if (width === 'fit') return resultWidth
  if (width === 'fit-shadow')
    return resultWidth + space + elementLens[elementsView] / 2

  return 0
}

const CustomCarousel: FC<IProps> = ({
  elementsMove,
  elementsView: incomingElementsView,
  title,
  href,
  children,
  additElem,
  classNameList,
  classNameWrapper,
  arrowSize = 32,
  space = 24,
  speed = 400,
  width = 'full',
  breakpoints,
}) => {
  const [elementLens, setElementLens] = useState<number[]>([])
  const refs = useRef<(HTMLDivElement | null)[]>([])
  const [elementsView, setElementsView] = useState(incomingElementsView)

  const containerWidth = formatWidth(width, elementLens, elementsView, space)
  const arrowPosition = width === 'fit-shadow' ? arrowSize - 4 : arrowSize + 4

  const { onClickRightArrow, onClickLeftArrow, viewArrow, move } =
    useCustomCarousel(elementLens, elementsView, elementsMove)

  const translate = `translate3d(-${move}px, 0, 0)`

  const setterElements = () => {
    setElementLens(() => {
      const arrayLen = refs.current.map(ref =>
        ref ? ref.offsetWidth + space : 0
      )
      return arrayLen
    })
  }

  useWindow(setterElements, [refs, setElementLens, elementsView])
  useBreakPoints(setElementsView, elementsView, breakpoints)

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
              gap: `${space}px`,
              transitionDuration: `${speed}ms`,
            }}
          >
            {Array.isArray(children) &&
              children.map((element, index) => (
                <div
                  key={index}
                  ref={ref => {
                    if (ref === null || refs.current.length >= children.length)
                      return

                    refs.current.push(ref)
                  }}
                >
                  {element}
                </div>
              ))}
            {additElem && (
              <div
                ref={ref => {
                  if (ref === null || refs.current.length >= children.length)
                    return

                  refs.current.push(ref)
                }}
              >
                {additElem()}
              </div>
            )}
          </div>
          <div className={style.arrows}>
            <div
              onClick={onClickLeftArrow}
              className={viewArrow('left')}
              style={{ left: `-${arrowPosition}px` }}
            >
              <MdArrowBackIosNew
                style={{ width: arrowSize, height: arrowSize }}
              />
            </div>
            <div
              onClick={onClickRightArrow}
              className={viewArrow('right')}
              style={{ right: `-${arrowPosition}px` }}
            >
              <MdArrowBackIosNew
                style={{ width: arrowSize, height: arrowSize }}
              />
            </div>
          </div>
          {width === 'fit-shadow' && (
            <>
              <div
                className={`${style.shadow} ${style.shadow_left} ${viewArrow(
                  'left'
                )}`}
              ></div>
              <div className={`${style.shadow} ${viewArrow('right')}`}></div>
            </>
          )}
        </div>
      </div>
    </article>
  )
}

export default memo(CustomCarousel)
