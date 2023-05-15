import { FC } from 'react'
import { IBasicBtnProps } from './BasicBtn.interface'
import style from './BasicBtn.module.scss'
import { getClassNameBtnType } from './BasicBtn.util'
import BasicBtnWrapper from './BasicBtnWrapper/BasicBtnWrapper'

const BasicBtn: FC<IBasicBtnProps> = ({
  className = '',
  btnType = 'text',
  children,
  title,
  suptitle,
  circle: isViewCircle = false,
  dark: isDark = false,
  ...props
}) => {
  const classNameBtnType = getClassNameBtnType(btnType, title, suptitle)
  const darkClassName = isDark ? style.dark : ''
  const currentClassName = `${style.button} ${classNameBtnType} ${darkClassName} ${className}`

  return (
    <BasicBtnWrapper className={currentClassName} {...props}>
      {isViewCircle && <div className={style.circle}></div>}
      {btnType !== 'text' ? (
        <>
          {children}
          <div className={style.description}>
            {suptitle && <p className={style.suptitle}>{suptitle}</p>}
            <p className={style.title}>{title}</p>
          </div>
        </>
      ) : (
        children
      )}
    </BasicBtnWrapper>
  )
}

export default BasicBtn
