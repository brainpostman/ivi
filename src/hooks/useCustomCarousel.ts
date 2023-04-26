import { useState } from 'react'

export const useCustomCarousel = (
  elementLens: number[],
  elementsView: number,
  elementsMove: number
) => {
  const cuttedElementLengths = elementLens.slice(elementsView)
  const numExtraEls = cuttedElementLengths.length % elementsMove

  const [move, setMove] = useState(0)

  const [currentIndex, setCurrentIndex] = useState(0)

  const onClickRightArrow = () => {
    const lastIndex =
      currentIndex + elementsMove <= cuttedElementLengths.length - numExtraEls
        ? currentIndex + elementsMove
        : currentIndex + numExtraEls

    const oneMove = cuttedElementLengths
      .slice(currentIndex, lastIndex)
      .reduce((accum, item) => accum + item, 0)

    setCurrentIndex(lastIndex)
    setMove(prev => prev + oneMove)
  }

  const onClickLeftArrow = () => {
    if (currentIndex - elementsMove <= 0) {
      setCurrentIndex(0)
      setMove(0)
      return
    }

    const oneMove = cuttedElementLengths
      .slice(currentIndex - elementsMove, currentIndex)
      .reduce((accum, item) => accum + item, 0)

    setCurrentIndex(currentIndex - elementsMove)
    setMove(prev => prev - oneMove)
  }

  const viewArrow = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      if (move <= 0) {
        return 'hide'
      }

      return ''
    }

    if (currentIndex > cuttedElementLengths.length - 1) {
      return 'hide'
    }

    return ''
  }

  return { onClickRightArrow, onClickLeftArrow, viewArrow, move }
}
