import { RefObject } from 'react'

// Получаем координату по оси Y
export const getCoordY = (ref: HTMLHeadingElement | null) => {
  if (ref) {
    const { y: coordY } = ref.getBoundingClientRect()
    return coordY
  }

  return 0
}

// Двигаем скролл на величину @move
export const scrollMove = (move: number) => {
  window.scrollTo({ behavior: 'smooth', top: move })
}
