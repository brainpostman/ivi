import Input from '@/components/UI/Input/Input'
import { renderModif } from '@/utils/test-utils/renderModif.util'
import '@testing-library/jest-dom'
import { fireEvent } from '@testing-library/react'

const testValue = 'test'

describe('<Input />', () => {
  // Проверяем ввод текста
  it('Change text', () => {
    const { container } = renderModif(<Input />)

    const input = container.getElementsByTagName('input')[0]
    expect(input).toBeInTheDocument()

    expect(input).toHaveDisplayValue('')

    fireEvent.change(input, { target: { value: testValue } })

    expect(input).toHaveDisplayValue(testValue)
  })
})
