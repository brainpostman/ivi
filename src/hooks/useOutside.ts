import { RefObject, useEffect } from 'react'
import useLatest from './useLatest'

/*
  * Действие при клике вне элемента

  * @param {RefObject<T>} ref - ссылка на элемент
  * @param {() => void} callback - исполняемая функция
  * @param {boolean} attached - статус видимости элемента
   
*/

const useOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  callback: () => void,
  attached = true
) => {
  const latestCallback = useLatest(callback)

  useEffect(() => {
    if (!attached) return
    const onClick = (event: MouseEvent) => {
      if (!ref.current) return
      console.log('CLICK')
      if (!ref.current.contains(event.target as Node)) {
        latestCallback.current()
      }
    }

    document.addEventListener('click', onClick)

    return () => document.removeEventListener('click', onClick)
  }, [ref, latestCallback, attached])
}

export default useOutside
