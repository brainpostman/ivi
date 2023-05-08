import {
  DetailedHTMLProps,
  FC,
  HTMLAttributes,
  KeyboardEvent,
  useEffect,
  useRef,
} from 'react'
import { IoCloseOutline } from 'react-icons/io5'
import style from './ModalWindow.module.scss'
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect'

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  isShow: boolean
  closeFunc: () => void
}

const ModalWindow: FC<IProps> = ({ children, isShow, closeFunc, ...props }) => {
  const onKeyPressEsc = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Escape') closeFunc()
  }

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
