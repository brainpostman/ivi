import VioletButton from '@/components/UI/VioletButton/VioletButton'
import { checkButton } from '@/utils/test-utils/button.util'
import { renderModif } from '@/utils/test-utils/renderModif.util'
import '@testing-library/jest-dom'

const testChildren = 'test'

describe('<VioletButton />', () => {
  // Проверяем стандартную кнопку
  it('Default', () => {
    const { getByText } = renderModif(
      <VioletButton>{testChildren}</VioletButton>
    )

    const button = getByText(testChildren)
    expect(button).toBeInTheDocument()
  })

  // Проверяем "variant = secondary"
  it('Variant secondary', () => {
    const { container } = renderModif(
      <VioletButton variant='secondary'>{testChildren}</VioletButton>
    )

    checkButton(container, 'secondary')
  })
})
