import { IBtnType } from '@/types/button.interface'
import style from './BasicBtn.module.scss'

export const getClassNameBtnType = (
  btnType: IBtnType,
  title?: string,
  suptitle?: string
) => {
  let resultStyle = style.text

  if (btnType === 'icon') {
    resultStyle = style.icon
  } else if (btnType === 'iconCircle') {
    resultStyle = style.iconCircle
  }
  if (title || suptitle) {
    resultStyle = style.textPlusIcon
  }

  return resultStyle
}
