import Link from 'next/link'
import { FC } from 'react'
import { IBasicBtnProps } from '../BasicBtn.interface'

const BasicBtnWrapper: FC<
  Pick<IBasicBtnProps, 'href' | 'children' | 'className' | 'target' | 'onClick'>
> = ({ href, target, className, onClick, children }) =>
  href ? (
    <Link href={href} className={className} target={target} rel='noreferrer'>
      {children}
    </Link>
  ) : (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  )

export default BasicBtnWrapper
