import { FC } from 'react'
import { IBasicBtnProps } from '../BasicBtn.interface'

const BasicBtnWrapper: FC<
	Pick<IBasicBtnProps, 'href' | 'children' | 'className' | 'target'>
> = ({ href, children, ...props }) =>
	href ? (
		<a href={href} rel='noreferrer' {...props}>
			{children}
		</a>
	) : (
		<>{children}</>
	)

export default BasicBtnWrapper
