import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect'

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
