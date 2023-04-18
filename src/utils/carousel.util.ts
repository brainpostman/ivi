import { Dispatch, SetStateAction } from 'react'

// @elementsView - Количество элементов, которые отображаются в карусели
// @elemntsMove - Количество элементов, на которое мы двигаем карусель
// @elementLen - полная длина элемента, включая отступ
// @blocksData - данные для блоков карусели

// TODO: переименовать channels
export const getCarouselFunctions = (
	move: number,
	setMove: Dispatch<SetStateAction<number>>,
	elementLen: number,
	elemntsMove: number,
	elementsView: number,
	blocksData:
		| { channels: { img: string; href: string }[] }
		| { title: string }[]
) => {
	const oneMove = elemntsMove * elementLen

	const __getNumTails = (listLength: number) =>
		(listLength - Math.abs(elementsView - elemntsMove)) % elemntsMove

	const __getLastMoves = (listLength: number) => {
		const numTailElems = __getNumTails(listLength)

		const numMoves = Math.floor(listLength / elementsView)
		const preLastMove = numMoves * elemntsMove * elementLen
		const lastMove = preLastMove + elementLen * numTailElems

		return { preLastMove, lastMove }
	}

	const onClickRightArrow = () => {
		const listLength =
			'channels' in blocksData ? blocksData.channels.length : blocksData.length

		const { lastMove, preLastMove } = __getLastMoves(listLength)

		const numTailElemsMove =
			__getNumTails(listLength) - Math.abs(elementsView - elemntsMove)

		if (move + oneMove >= lastMove - elementLen) return

		if (move + oneMove >= preLastMove) {
			setMove(prev => prev + numTailElemsMove * elementLen + elementLen / 2)
			return
		}

		setMove(prev => prev + oneMove)
	}

	const onClickLeftArrow = () => {
		if (move - oneMove <= 0) {
			setMove(0)
			return
		}

		setMove(prev => prev - oneMove)
	}

	// Показываем или скрываем стрелку
	const viewArrow = (direction: 'left' | 'right') => {
		if (direction === 'left') {
			if (move <= 0) {
				return 'hide'
			}
			return ''
		} else if (direction === 'right') {
			const listLength =
				'channels' in blocksData
					? blocksData.channels.length
					: blocksData.length

			const { lastMove } = __getLastMoves(listLength)

			if (move + oneMove >= lastMove - elementLen) {
				return 'hide'
			}
			return ''
		}
	}

	return { onClickRightArrow, onClickLeftArrow, viewArrow }
}
