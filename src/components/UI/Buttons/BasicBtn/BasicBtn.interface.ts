import { IBtnType } from '@/types/button.interface'
import { HTMLAttributeAnchorTarget } from 'react'
/*
  * @param {IBtnType} btnType - тип внешнего вида кнопки
  * @param {string} href - ссылка
  * @param {string} suptitle - текст над текстом кнопки
  * @param {string} title - текст кнопки
  * @param {HTMLAttributeAnchorTarget} target - поведение при нажатии на ссылку
    Работает, если указан href
  * @param {boolean} circle - показать красный кружок

*/
export interface IBasicBtnProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  btnType?: IBtnType
  href?: string
  navlink?: string
  suptitle?: string
  title?: string
  target?: HTMLAttributeAnchorTarget
  circle?: boolean
  dark?: boolean
}
