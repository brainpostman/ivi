import { useEffect } from 'react'

// === PROPS ===
// @param { * } callback - исполняемая функция
// @param { * } deps - массив зависимостей, которые триггерят выполнение функции
// @param delay - задержка в мс

export const useDebounce = (
  callback: () => void,
  deps: any[] = [],
  delay = 150
) => {
  useEffect(() => {
    const timer = setTimeout(() => callback(), delay)
    return () => clearTimeout(timer)
  }, [...deps, delay])
}
