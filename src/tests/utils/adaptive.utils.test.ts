import { adaptiveSize } from '@/utils/adaptive.utils'

const screenWidth = 1920

const testPcSize = 200
const testMobSize = 50
const testCustomSize = 600
const testFullSize = 1240

const expectedWithOnlyRequiredProps = 200
const expectedWithAllProps = 359.375

jest.spyOn(window.screen, 'width', 'get').mockReturnValue(screenWidth)

describe('UTIL adaptiveSize', () => {
  // Только обязательные пропсы
  it('With only required props', () => {
    const result = adaptiveSize(testPcSize, testMobSize)

    expect(result).toBe(expectedWithOnlyRequiredProps)
  })

  it('With all props', () => {
    const result = adaptiveSize(
      testPcSize,
      testMobSize,
      testCustomSize,
      testFullSize
    )

    expect(result).toBe(expectedWithAllProps)
  })
})
