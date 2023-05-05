import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'

export const useBreakPoints = (
  setter: Dispatch<SetStateAction<number>>,
  defaultElementsView: number,
  breakpoints?: { point: number; view: number }[]
) => {
  if (!breakpoints?.length) return
  const currentElementsView = useRef(defaultElementsView)

  const callback = () => {
    const _breakpoints = [...breakpoints].sort((a, b) => b.point - a.point)
    const nearestBreakpoints = _breakpoints.filter(
      bp => bp.point >= window.innerWidth
    )

    if (!nearestBreakpoints?.length) {
      setter(defaultElementsView)
      currentElementsView.current = defaultElementsView
      return
    }

    const currentBreakPoint = nearestBreakpoints.at(-1)!

    if (currentElementsView.current === currentBreakPoint.view) return

    currentElementsView.current = currentBreakPoint.view
    setter(currentBreakPoint.view)
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', callback)
    }

    callback()

    return () => window.removeEventListener('resize', callback)
  }, [setter])
}
