import { IHeaderBroadCast, IHeaderChannels } from '@/types/hoverblock.interface'
import { Dispatch, SetStateAction } from 'react'

// @elementsView - Количество элементов, которые отображаются в карусели
// @elemntsMove - Количество элементов, на которое мы двигаем карусель
// @elementLen - полная длина элемента, включая отступ
// @blocksData - данные для блоков карусели

export const getCarouselFunction = (
	move: number,
	setMove: Dispatch<SetStateAction<number>>,
	elementLen: number,
	elemntsMove: number,
	elementsView: number,
	blocksData: IHeaderChannels | IHeaderBroadCast[]
) => {
	const oneMove = elemntsMove * elementLen

	const __getLastMoves = (listLength: number) => {
		const numTailElems = (listLength - 1) % elemntsMove

		const numMoves = Math.floor(listLength / elementsView)
		const preLastMove = numMoves * elemntsMove * elementLen
		const lastMove = preLastMove + elementLen * numTailElems

		return { preLastMove, lastMove }
	}

	const onClickRightArrow = (
		blockList: IHeaderChannels | IHeaderBroadCast[]
	) => {
		const listLength =
			'channels' in blockList ? blockList.channels.length : blockList.length

		const { lastMove, preLastMove } = __getLastMoves(listLength)
		const numTailElems = (listLength - 2) % elemntsMove

		if (move + oneMove >= lastMove - elementLen) return

		if (move + oneMove >= preLastMove) {
			setMove(prev => prev + numTailElems * elementLen)
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
