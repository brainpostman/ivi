import { Url } from 'next/dist/shared/lib/router/router'

export type ICustomCarouselWidth = 'full' | 'fit' | 'fit-shadow'

export interface ICustomCarouselProps {
  elementsView: number
  elementsMove: number
  title?: string
  href?: Url
  children: React.ReactNode[]
  additElem?: JSX.Element
  classNameList?: string
  classNameWrapper?: string
  arrowSize?: number
  space?: number[]
  speed?: number
  width?: ICustomCarouselWidth
  breakpoints?: { point: number; view: number }[]
  padding?: number
}
