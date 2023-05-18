// Получаем координату по оси Y
/*
  * @param {HTMLHeadingElement | null} ref - заголовок
  * @returns number - координата по оси Y

*/

export const getCoordY = (ref: HTMLHeadingElement | null): number => {
  if (ref) {
    const { y: coordY } = ref.getBoundingClientRect()
    return coordY
  }

  return 0
}

// Двигаем скролл на величину move

// @param {number} move - свдиг

export const scrollMove = (move: number) => {
  window.scrollTo({ behavior: 'smooth', top: move })
}
