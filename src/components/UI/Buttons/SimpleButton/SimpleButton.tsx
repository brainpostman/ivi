import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react'
import style from './SimpleButton.module.scss'

const SimpleButton: FC<
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
> = ({ children, className = '', ...props }) => {
  return (
    <button className={`${style.button} ${className}`} {...props}>
      {children}
    </button>
  )
}

export default SimpleButton
