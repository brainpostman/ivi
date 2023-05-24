import { formatCarouselWidth } from '@/formatters/carouselWidth.format'

const elementLens = [300, 300, 300, 300, 300, 300]

describe('FORMAT formatCarouselWidth', () => {
  // with = full
  it('Width full', () => {
    const carouselWidth = formatCarouselWidth('full', 12)
    const correctWidth = 1225
    expect(carouselWidth).toBe(correctWidth)
  })

  // width = fit
  it('Width fit', () => {
    const carouselWidth = formatCarouselWidth('fit', 12, 0, elementLens, 3)
    const correctWidth = 888

    expect(carouselWidth).toBe(correctWidth)
  })

  it('Width fit-shadow', () => {
    const carouselWidth = formatCarouselWidth(
      'fit-shadow',
      12,
      0,
      elementLens,
      3
    )
    const correctWidth = 1050

    expect(carouselWidth).toBe(correctWidth)
  })
})

describe('FORMAT ERROR formatCarouselWidth', () => {
  it('Wrong props', () => {
    const carouselWidth = formatCarouselWidth('fit', 12)

    expect(carouselWidth).toBe(0)
  })
})
