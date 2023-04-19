import { FC } from 'react'
import { IBasicBtnProps } from '../BasicBtn.interface'

const BasicBtnWrapper: FC<
	Pick<IBasicBtnProps, 'href' | 'children' | 'className' | 'target'>
> = ({ href, children, target, className }) =>
	href ? (
		<a href={href} target={target} rel='noreferrer' className={className}>
			{children}
		</a>
	) : (
		<>{children}</>
	)

export default BasicBtnWrapper
