/*
  * Получаем координату по оси Y

  * @param {HTMLElement | null} ref - заголовок
  * @returns number - координата по оси Y

*/

export const getCoordY = (ref: HTMLElement | null): number => {
  if (!ref) {
    return 0
  }

  const { y: coordY } = ref.getBoundingClientRect()
  return coordY
}

// Двигаем скролл на величину move

// @param {number} move - свдиг

export const scrollMove = (move: number) => {
  window.scrollTo({ behavior: 'smooth', top: move })
}
