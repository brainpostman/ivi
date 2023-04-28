import { useEffect } from 'react'

export const useWindow = (callback: () => void, deps?: any[]) => {
  const incomingDeps = deps || []

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', callback)
    }

    callback()

    return () => window.removeEventListener('resize', callback)
  }, incomingDeps)
}
