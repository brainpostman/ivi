import { Url } from 'next/dist/shared/lib/router/router'

/*
 * @param {number} point - ширина
 * @param {number} view - количество элементов

*/

interface IBreakPoint {
  point: number
  view: number
}

export type ICustomCarouselWidth = 'full' | 'fit' | 'fit-shadow'

/*
  * @param {number} elementsView - количество элементов, которые отображаются в 
    карусели (указываем на 1 элемент меньше)
  * @param {number} elemntsMove - количество элементов, на которое мы двигаем 
    карусель
  * @param {ReactNode[]} hildren - элементв карусели
  * @param {string} title - заголовок карусели
  * @param {Url} href - ссылка в заголовке
  * @param {JSX.Element} additElem - допольнительный элемент
  * @param {string} classNameList - класс для списка элементов
  * @param {string} classNameWrapper - класс для обёртки
  * @param {number} arrowSize - размер стрелок
  * @param {[number, number]} space - адаптивный отступ между элементами: 
    [начальный отступ, коненчный отступ]
  * @param {number} speed - скорость анимации движения (в мс)
  * @param {ICustomCarouselWidth} width - ширина ограничивающего контейнера
  'full' - 1225px; 'fit' - ограничивается по elementsView; 'fit-shadow' -  
  добавляется тень + контейнер увеличивается на половину следующего элемента
  * @param {IBreakPoint[]} breakpoints - брейкпоинты
  *  при достижении брейкпоинта @param elementsView уменьшается на 1
  * @param {number} padding - допольнительный отступ
  * @param {boolean} autoplay - автовоспроизведение анимации
   
*/

export interface ICustomCarouselProps {
  elementsView: number
  elementsMove: number
  title?: string
  href?: Url
  children: React.ReactNode[]
  additElem?: JSX.Element
  classNameList?: string
  classNameWrapper?: string
  arrowSize?: number
  space?: [number, number]
  speed?: number
  width?: ICustomCarouselWidth
  breakpoints?: IBreakPoint[]
  padding?: number
  autoplay?: boolean
}
