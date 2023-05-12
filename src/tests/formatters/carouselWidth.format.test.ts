import { formatCarouselWidth } from '@/formatters/carouselWidth.format'

const elementLens = [300, 300, 300, 300, 300, 300]

describe('carouselWidth formatter', () => {
  // with = full
  it('Check width full', () => {
    const carouselWidth = formatCarouselWidth('full', 12)
    const checkCarouselWidth = carouselWidth === 1225
    expect(checkCarouselWidth).toBeTruthy()
  })

  // width = fit
  it('Check width fit', () => {
    const carouselWidth = formatCarouselWidth('fit', 12, 0, elementLens, 3)
    const correctWidth = 888

    const checkCarouselWidth = carouselWidth === correctWidth

    expect(checkCarouselWidth).toBeTruthy()
  })

  it('Check width fit-shadow', () => {
    const carouselWidth = formatCarouselWidth(
      'fit-shadow',
      12,
      0,
      elementLens,
      3
    )
    const correctWidth = 1050
    const checkCarouselWidth = carouselWidth === correctWidth

    expect(checkCarouselWidth).toBeTruthy()
  })
})

describe('carouselWidth formatter error', () => {
  it('Wrong props', () => {
    const carouselWidth = formatCarouselWidth('fit', 12)
    const checkCarouselWidth = carouselWidth === 0

    expect(checkCarouselWidth).toBeTruthy()
  })
})
