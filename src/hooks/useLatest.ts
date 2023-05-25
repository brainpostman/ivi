import { MutableRefObject, useRef } from 'react'
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect'

/*
  * Мемоизация с помощью useRef

  * @param {T} value - значение для мемоизации
  * @returns MutableRefObject<T> - ссылка на значение

*/

const useLatest = <T>(value: T): MutableRefObject<T> => {
  const ref = useRef(value)

  useIsomorphicLayoutEffect(() => {
    ref.current = value
  }, [value])

  return ref
}

export default useLatest
