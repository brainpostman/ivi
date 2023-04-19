import Link from 'next/link'
import { FC } from 'react'
import { IBasicBtnProps } from '../BasicBtn.interface'

const BasicBtnWrapper: FC<
	Pick<
		IBasicBtnProps,
		'href' | 'children' | 'className' | 'target' | 'navlink' | 'onClick'
	>
> = ({ href, navlink, target, className, onClick, children }) =>
	href ? (
		<a href={href} target={target} className={className} rel='noreferrer'>
			{children}
		</a>
	) : navlink ? (
		<Link href={navlink} className={className}>
			{children}
		</Link>
	) : (
		<button className={className} onClick={onClick}>
			{children}
		</button>
	)

export default BasicBtnWrapper
