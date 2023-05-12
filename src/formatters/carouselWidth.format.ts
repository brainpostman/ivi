import { ICustomCarouselWidth } from '@/types/customCarousel.interface'

// === PROPS ===
// @param { * } width - тип ширины карусели
// @param { * } space - отступ между элементами
// @param padding - внутренний отступ
// @param  elementLens - массив длин элементов
// @param  elementsView - количество видимых элементов

export const formatCarouselWidth = (
  width: ICustomCarouselWidth,
  space: number,
  padding = 0,
  elementLens?: number[],
  elementsView?: number
) => {
  if (width === 'full') return 1225

  if (elementsView && elementLens) {
    const resultWidth =
      elementLens.slice(0, elementsView).reduce((accum, item) => {
        if (accum < 1225) accum += item
        return accum
      }, 0) -
      space +
      padding

    if (width === 'fit') return resultWidth
    if (width === 'fit-shadow')
      return resultWidth + space + elementLens[elementsView] / 2 + padding
  }

  return 0
}
