import { getCoordY, scrollMove } from '@/utils/coords.utils'
import { renderModif } from '@/utils/test-utils/renderModif.util'
import '@testing-library/jest-dom'

let testValidHtmlElement: HTMLElement | null = null
let testInvalidHtmlElement: HTMLElement | null = null

const testCoordY = 150

const testMove = 200
const expectedScrollMove = {
  behavior: 'smooth',
  top: testMove,
}

const mockClientRect = {
  x: 200,
  y: testCoordY,
  width: 100,
  height: 20,
  top: 200,
  right: 200,
  bottom: 250,
  left: 200,
  toJSON: jest.fn(),
}

const scrollMoveSpy = jest.spyOn(window, 'scrollTo').mockImplementation()

describe('UTIL getCoordY', () => {
  beforeAll(() => {
    renderModif(
      <div>
        <div
          ref={ref => {
            testValidHtmlElement = ref
          }}
          style={{ height: 2300, width: 200 }}
        >
          TEST
        </div>
      </div>
    )
  })

  // Корректное значение
  it('Valid value', () => {
    expect(testValidHtmlElement).toBeInTheDocument()
    if (!testValidHtmlElement) return

    testValidHtmlElement.getBoundingClientRect = jest.fn(() => mockClientRect)

    const coordY = getCoordY(testValidHtmlElement)
    expect(coordY).toBe(testCoordY)
  })
})

describe('UTIL ERROR getCoordY', () => {
  beforeAll(() => {
    renderModif(
      <div>
        <div style={{ height: 2300, width: 200 }}>TEST</div>
      </div>
    )
  })

  // Некорректное значение
  it('Invalid value', () => {
    const coordY = getCoordY(testInvalidHtmlElement)
    expect(coordY).toBe(0)
  })
})

describe('UTIL scrollMove', () => {
  // Пример
  it('Example', () => {
    scrollMove(testMove)

    expect(scrollMoveSpy).toHaveBeenCalledWith(expectedScrollMove)
  })
})
