import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect'

/*
  * @param {() => void} callback - функция, исполняемая при изменении ширины 
    окна
  * @param {any[]} deps - дополнительные зависимости
*/

export const useWindow = (callback: () => void, deps?: any[]) => {
  const incomingDeps = deps || []

  useIsomorphicLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', callback)
    }

    callback()

    return () => window.removeEventListener('resize', callback)
  }, incomingDeps)
}
