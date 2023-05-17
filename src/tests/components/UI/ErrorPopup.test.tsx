import ErrorPopup from '@/components/UI/ErrorPopup/ErrorPopup'
import { renderModif } from '@/utils/test-utils/renderModif.util'
import '@testing-library/jest-dom'

const testMessages = ['Error #1', 'Error #2', 'Error #3', 'Error #4']
const testOneMessage = 'Error #1'

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    }
  },
}))

describe('<ErrorPopup />', () => {
  // Проверяем список ошибок
  it('Display message list', () => {
    const { getByText } = renderModif(<ErrorPopup messages={testMessages} />)
    const listElements = testMessages.map(message => getByText(message))

    expect(listElements.length).toBe(testMessages.length)
  })

  // Проверяем одну ошибку
  it('Display specific message', () => {
    const { getByText } = renderModif(<ErrorPopup messages={testOneMessage} />)

    const element = getByText(testOneMessage)
    expect(element).toBeInTheDocument()
  })
})
