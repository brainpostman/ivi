import { ICustomCarouselWidth } from '@/types/customCarousel.interface'
/*
  * @param {ICustomCarouselWidth} width - тип ширины карусели
  * @param {number} space - отступ между элементами
  * @param {number} padding - внутренний отступ
  * @param {number[]} elementLens - массив длин элементов
  * @param {number} elementsView - количество видимых элементов
  * @returns number

*/
export const formatCarouselWidth = (
  width: ICustomCarouselWidth,
  space: number,
  padding = 0,
  elementLens?: number[],
  elementsView?: number
): number => {
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
