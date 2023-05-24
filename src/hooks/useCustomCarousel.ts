import { useState } from 'react'

/*
  * @param {() => void} onClickRightArrow - функция для клика на правую стрелку
  * @param {() => void} onClickLeftArrow - функция для клика не левую стрелку
  * @param {(direction: 'left' | 'right') => 'hide' | ''} viewArrow - className, показываем или скрываем стрелку
  * @param {number} move - сдвиг

*/
interface IUseCustomCarousel {
  onClickRightArrow: () => void
  onClickLeftArrow: () => void
  viewArrow: (direction: 'left' | 'right') => 'hide' | ''
  move: number
}
/*
  * @param {number[]} elementLens - длины элементов
  * @param {number} elementsView - количество видимых элементов
  * @param {number} elementsMove - количество элементов, на которое двигается 
    карусель
  * @returns IUseCustomCarousel

*/
export const useCustomCarousel = (
  elementLens: number[],
  elementsView: number,
  elementsMove: number
): IUseCustomCarousel => {
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
