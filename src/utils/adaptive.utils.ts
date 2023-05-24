/*
  * @param {number} pcSize - начальный размер
  * @param {number} mobSize - конечный размер
  * @param {number} customSize - минимальный вьюпорт
  * @param {number} fullSize - максимальный вьюпорт
  * @returns number - адаптивный размер

*/

export const adaptiveSize = (
  pcSize: number,
  mobSize: number,
  customSize = 320,
  fullSize = 1920
) => {
  const addSize = pcSize - mobSize
  return (
    mobSize +
    addSize * ((window.screen.width - customSize) / (fullSize - customSize))
  )
}
