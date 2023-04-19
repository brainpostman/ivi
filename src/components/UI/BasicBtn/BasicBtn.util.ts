import { IBtnType } from '@/types/button.interface'
import style from './BasicBtn.module.scss'

export const getClassNameBtnType = (btnType: IBtnType) => {
	switch (btnType) {
		case 'textPlusIcon':
			return style.textPlusIcon
		case 'icon':
			return style.icon
		case 'iconCircle':
			return style.iconCircle
		default:
			return style.text
	}
}
