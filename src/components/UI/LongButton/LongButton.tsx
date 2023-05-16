import { IVarButton } from '@/types/button.interface'
import Image from 'next/image'
import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react'
import style from './LongButton.module.scss'

interface IProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variant?: IVarButton
  img?: string
}

const LongButton: FC<IProps> = ({
  variant = 'primary',
  img,
  children,
  ...props
}) => {
  const additClassName = variant === 'secondary' ? style.secondary : ''
  const className = `${style.button} ${additClassName}`

  return (
    <button className={className} {...props}>
      {img && <Image src={img} alt='' width={24} height={32} />}
      <p>{children}</p>
    </button>
  )
}

export default LongButton
