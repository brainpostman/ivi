import { IIconHedaderIconButton } from '@/types/button.interface'
import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react'
import { MdOutlineNotifications } from 'react-icons/md'
import { RiSearchLine } from 'react-icons/ri'
import style from './HeaderIconButton.module.scss'

interface IProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  icon?: IIconHedaderIconButton
  customIcon?: React.ReactElement
}

const HeaderIconButton: FC<IProps> = ({
  children,
  icon,
  customIcon,
  className: classNameIncoming = '',
  ...props
}) => {
  const className = `text ${style.wrapper} ${classNameIncoming}`

  const getIcon = () => {
    switch (icon) {
      case 'search':
        return <RiSearchLine />
      case 'notification':
        return <MdOutlineNotifications className={style.notif_icon} />
      default:
        return customIcon || <></>
    }
  }

  return (
    <button className={className} {...props}>
      {getIcon()}
      <p>{children}</p>
    </button>
  )
}

export default HeaderIconButton
