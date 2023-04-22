import { useLayoutEffect, useRef } from 'react'

export const useCustomCarouselContent = (
	addElementLen: (width: number) => void
) => {
	const ref = useRef<any>(null)
	const isSelectedRef = useRef(false)

	useLayoutEffect(() => {
		if (!ref.current || isSelectedRef.current) return

		addElementLen(ref.current.offsetWidth)
		isSelectedRef.current = true
	}, [ref])

	return ref
}
