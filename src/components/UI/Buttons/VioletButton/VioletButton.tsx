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

const VioletButton: FC<IProps> = ({
  children,
  className = '',
  variant = 'primary',
  ...props
}) => {
  const currentClassName = `${style.button} ${
    variant === 'secondary' ? style.secondary : ''
  } ${className}`

  return (
    <button className={currentClassName} {...props}>
      {children}
    </button>
  )
}

export default VioletButton
