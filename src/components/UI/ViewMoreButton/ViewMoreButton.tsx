import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react'
import style from './ViewMoreButton.module.scss'

const ViewMoreButton: FC<
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
> = ({ children, ...props }) => {
  return (
    <button className={style.button} {...props}>
      {children || 'Показать ещё'}
    </button>
  )
}

export default ViewMoreButton
