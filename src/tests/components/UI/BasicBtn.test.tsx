import BasicBtn from '@/components/UI/BasicBtn/BasicBtn'
import { renderModif } from '@/utils/test-utils/renderModif.util'
import '@testing-library/jest-dom'
import { FaViber } from 'react-icons/fa'
import '@testing-library/jest-dom'
import { checkButton } from '@/utils/test-utils/button.util'

const testChildren = 'test'
const testTitle = 'testTitle'
const testSuptitle = 'testSuptitle'

const testHref = 'www.ivi.ru'

describe('<BasicBtn />', () => {
  // Проверяем стандартный вид кнопки
  it('Default BasicBtn', () => {
    const { getByText } = renderModif(<BasicBtn>{testChildren}</BasicBtn>)

    const button = getByText(testChildren)
    expect(button).toBeInTheDocument()
  })

  // Проверяем пропс "btnType = icon"
  // Проверяем наличие иконки и отсутствие текста в кнопке
  it('btnType = icon', () => {
    const { container } = renderModif(
      <BasicBtn btnType='icon'>
        <FaViber />
      </BasicBtn>
    )

    checkButton(container, 'icon', true)
  })

  // Проверяем пропс "btnType = iconCircle"
  it('BtnType = iconCircle', () => {
    const { container } = renderModif(
      <BasicBtn btnType='iconCircle'>
        <FaViber />
      </BasicBtn>
    )
    checkButton(container, 'iconCircle', true)
  })

  // Проверяем заголовок и надзаголовок
  it('title & suptitle ', () => {
    const { container } = renderModif(
      <BasicBtn btnType='icon' title={testTitle} suptitle={testSuptitle}>
        <FaViber />
      </BasicBtn>
    )

    checkButton(container, 'textPlusIcon', true)

    const title = container.getElementsByClassName('title')[0]
    const suptitle = container.getElementsByClassName('suptitle')[0]

    expect(title).toBeInTheDocument()
    expect(suptitle).toBeInTheDocument()

    expect(title).toHaveTextContent(testTitle)
    expect(suptitle).toHaveTextContent(testSuptitle)
  })

  // Проверяем красный кружок в углу кнопки
  it('Red circle', () => {
    const { container } = renderModif(
      <BasicBtn circle>{testChildren}</BasicBtn>
    )

    checkButton(container)
    const redCircle = container.getElementsByClassName('circle')[0]
    expect(redCircle).toBeInTheDocument()
  })

  // Проверяем стиль dark
  it('Dark style', () => {
    const { container } = renderModif(<BasicBtn dark>{testChildren}</BasicBtn>)
    checkButton(container, 'dark')
  })

  // Проверяем ссылку
  it('Href', () => {
    const { container } = renderModif(
      <BasicBtn href={testHref}>{testChildren}</BasicBtn>
    )

    const href = container.querySelector(`a[href*="${testHref}"]`)
    expect(href).toBeInTheDocument()
  })
})
