import { ICustomCarouselWidth } from '@/types/customCarousel'

export const formatCarouselWidth = (
  width: ICustomCarouselWidth,
  elementLens: number[],
  elementsView: number,
  space: number,
  padding = 0
) => {
  if (width === 'full') return 1225

  const resultWidth =
    elementLens
      .slice(0, elementsView)
      .reduce((accum, item) => accum + item, 0) -
    space +
    padding

  if (width === 'fit') return resultWidth
  if (width === 'fit-shadow')
    return resultWidth + space + elementLens[elementsView] / 2 + padding

  return 0
}
