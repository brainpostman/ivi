import { DetailedHTMLProps, FC, HTMLAttributes } from 'react'
import { IoCloseOutline } from 'react-icons/io5'
import style from './ModalWindow.module.scss'

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  isShow: boolean
  closeFunc: () => void
}

const ModalWindow: FC<IProps> = ({ children, isShow, closeFunc, ...props }) => {
  return (
    <section
      className={`${style.wrapper} ${!isShow ? style.hide : ''}`}
      {...props}
    >
      <IoCloseOutline className={style.close_icon} onClick={closeFunc} />
      {children}
    </section>
  )
}
export default ModalWindow
