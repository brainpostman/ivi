/*
  * @param {HTMLElement} container - контейнер
  * @param {string} btnClassName - класс кнопки
  * @param {boolean} isExistIcon - существует ли иконка

*/
export const checkButton = (
  container: HTMLElement,
  btnClassName?: string,
  isExistIcon?: boolean
) => {
  const button = container.getElementsByTagName('button')[0]
  expect(button).toBeInTheDocument()

  if (!button) return

  if (btnClassName) {
    expect(button).toHaveClass(btnClassName)
  }

  if (isExistIcon) {
    const icon = button.getElementsByTagName('svg')[0]
    expect(icon).toBeInTheDocument()
  }
}
