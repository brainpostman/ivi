import Link from 'next/link'
import { FC } from 'react'
import { IBasicBtnProps } from '../BasicBtn.interface'

const BasicBtnWrapper: FC<
	Pick<IBasicBtnProps, 'href' | 'children' | 'className' | 'target' | 'navlink'>
> = ({ href, navlink, children, ...props }) =>
	href ? (
		<a href={href} rel='noreferrer' {...props}>
			{children}
		</a>
	) : navlink ? (
		<Link href={navlink}></Link>
	) : (
		<>{children}</>
	)

export default BasicBtnWrapper
