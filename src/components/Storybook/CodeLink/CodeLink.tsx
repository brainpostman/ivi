import { FC } from 'react'
import Link from 'next/link'
import style from './CodeLink.module.scss'

interface IProps {
  href: string
}

const CodeLink: FC<IProps> = ({ href }) => {
  return (
    <Link href={href} className={style.link} target='_blank'>
      RESOURCE
    </Link>
  )
}

export default CodeLink
