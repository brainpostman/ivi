import { IBtnType } from '@/types/button.interface'
import { HTMLAttributeAnchorTarget } from 'react'

// ==== PROPS ====
// @param btnType - тип внешнего вида кнопки
// @param href - обычная ссылка
// @param navlink - ссылка для навигации
// Испольузем либо href, либо navlink
// @param suptitle - текст над текстом кнопки
// Работает при btnType = 'textPlusIcon'
// @param title - текст кнопки
// Работает при btnType = 'textPlusIcon'
// @param target - поведение при нажатии на ссылку
// Работает, если указан href
// @param circle - показать красный кружок

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
