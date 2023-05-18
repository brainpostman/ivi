import { useEffect } from 'react'

/*
  * @param {() => void} callback - исполняемая функция
  * @param {any[]} deps - массив зависимостей, которые триггерят выполнение 
    функции
  * @param {number} delay - задержка в мс

*/
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
