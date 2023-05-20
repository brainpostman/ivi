import { getCoordY } from '@/utils/coords.utils'
import { renderModif } from '@/utils/test-utils/renderModif.util'
import '@testing-library/jest-dom'

let testValidHtmlElement: HTMLElement | null = null
let testInvalidHtmlElement: HTMLElement | null = null

const testCoordY = 150

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

    testValidHtmlElement.getBoundingClientRect = jest.fn(() => ({
      x: 200,
      y: testCoordY,
      width: 100,
      height: 20,
      top: 200,
      right: 200,
      bottom: 250,
      left: 200,
      toJSON: jest.fn(),
    }))

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
