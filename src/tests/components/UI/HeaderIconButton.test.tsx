import HeaderIconButton from '@/components/UI/HeaderIconButton/HeaderIconButton'
import { checkButton } from '@/utils/test-utils/button.util'
import { renderModif } from '@/utils/test-utils/renderModif.util'
import { AiFillCheckCircle } from 'react-icons/ai'
import '@testing-library/jest-dom'

const testChildren = 'test'

describe('<HeaderIconButton />', () => {
  // Проверяем стандартную кнопку
  it('Check default', () => {
    const { getByText } = renderModif(
      <HeaderIconButton>{testChildren}</HeaderIconButton>
    )

    const button = getByText(testChildren)
    expect(button).toBeInTheDocument()
  })

  // Проверяем кастомную иконку
  it('Check custom icon', () => {
    const { container } = renderModif(
      <HeaderIconButton customIcon={<AiFillCheckCircle />} />
    )

    checkButton(container, undefined, true)
  })

  // Проверяем иконку поиска
  it('Check icon search', () => {
    const { container } = renderModif(<HeaderIconButton icon='search' />)

    checkButton(container, undefined, true)
  })

  // Проверяем иконку уведомления
  it('Check icon search', () => {
    const { container } = renderModif(<HeaderIconButton icon='notification' />)

    checkButton(container, undefined, true)
    const notifIcon = container.getElementsByClassName('notif_icon')[0]
    expect(notifIcon).toBeInTheDocument()
  })
})
