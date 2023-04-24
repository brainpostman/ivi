import { useCustomCarouselContent } from '@/hooks/useCustomCarouselContent'
import { IVarButton } from '@/types/button.interface'
import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react'
import style from './VioletButton.module.scss'

interface IProps
	extends DetailedHTMLProps<
		ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {
	variant?: IVarButton
}

const VioletButton: FC<IProps> = (
	{ children, variant = 'primary', ...props },
	addElementLen
) => {
	const currentClassName = `${style.button} ${
		variant === 'secondary' ? style.secondary : ''
	}`
	const wrapperRef = useCustomCarouselContent(addElementLen)

	return (
		<button className={currentClassName} ref={wrapperRef} {...props}>
			{children}
		</button>
	)
}

export default VioletButton
