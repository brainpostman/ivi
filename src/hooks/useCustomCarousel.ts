import { useState } from 'react'

export const useCustomCarousel = (
	elementLens: number[],
	elementsView: number,
	elementsMove: number
) => {
	const cuttedElementLengths = elementLens.slice(elementsView)
	const numExtraEls = cuttedElementLengths.length % elementsMove

	// DEBUG:
	console.log(cuttedElementLengths)

	const [move, setMove] = useState(0)

	const [currentIndex, setCurrentIndex] = useState(0)

	const onClickRightArrow = () => {
		const lastIndex =
			currentIndex + elementsMove <= cuttedElementLengths.length - numExtraEls
				? currentIndex + elementsMove
				: currentIndex + numExtraEls

		console.log(`numExtraEls = ${numExtraEls}`)

		console.log(`leftLand = ${currentIndex + elementsMove}`)
		console.log(`rightHand = ${cuttedElementLengths.length - numExtraEls}`)

		console.log(currentIndex)
		console.log(lastIndex)

		const oneMove = cuttedElementLengths
			.slice(currentIndex, lastIndex)
			.reduce((accum, item) => accum + item, 0)

		setCurrentIndex(lastIndex)
		setMove(prev => prev + oneMove)
	}

	const onClickLeftArrow = () => {
		setCurrentIndex(0)
		setMove(0)
	}

	const viewArrow = (direction: 'left' | 'right') => {}

	return { onClickRightArrow, onClickLeftArrow, viewArrow, move }
}
