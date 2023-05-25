import { FC, PropsWithChildren } from 'react'
import style from './GrayBlock.module.scss'

const GrayBlock: FC<PropsWithChildren<unknown>> = ({ children }) => {
  return <div className={style.wrapper}>{children}</div>
}

export default GrayBlock
