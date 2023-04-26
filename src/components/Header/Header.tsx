import { useTypedSelector } from '@/hooks/ReduxHooks'
import { IHeaderBlock, IHeaderTab } from '@/types/header.interface'
import { useRouter } from 'next/router'
import { MouseEvent, useEffect, useRef, useState } from 'react'
import AuthModal from '../AuthModal/AuthModal'
import style from './Header.module.scss'
import HeaderHoverBlock from './HeaderHoverBlock/HeaderHoverBlock'
import HeaderLeftSide from './HeaderLeftSide/HeaderLeftSide'
import HeaderRightSide from './HeaderRightSide/HeaderRightSide'

const Header = () => {
  const { pathname } = useRouter()
  const [classNameHeader, setClassNameHeader] = useState(style.wrapper)
  const [hoverTab, setHoverTab] = useState<IHeaderTab>(undefined)
  const [isOnTab, setIsOnTab] = useState(false)
  const { showAuthModal } = useTypedSelector(state => state.authModal)

  const timer = useRef<any>(undefined)

  const onHeaderHoverBlockMouseEnter = () => {
    setIsOnTab(true)
    clearTimeout(timer.current)
  }

  const onHeaderHoverBlockMouseLeave = () => {
    setIsOnTab(false)
  }

  const onTabMouseLeave = () => {
    timer.current = setTimeout(() => setIsOnTab(false), 100)
  }

  const classNameContainer = isOnTab
    ? `${style.container} ${style.effect}`
    : style.container

  const showHoverBlock = (tab: IHeaderTab) => {
    if (tab === undefined) {
      setIsOnTab(false)
    } else {
      setIsOnTab(true)
    }

    setHoverTab(tab)
  }

  useEffect(() => {
    if (pathname === '/') {
      setClassNameHeader(style.wrapper)
      return
    }

    setClassNameHeader(`${style.wrapper} ${style.border_bottom}`)
  }, [pathname])

  return (
    <header className={classNameHeader}>
      <section className={classNameContainer}>
        <HeaderLeftSide
          showHoverBlock={showHoverBlock}
          onTabMouseLeave={onTabMouseLeave}
        />
        <HeaderRightSide showHoverBlock={showHoverBlock} />
        {isOnTab && (
          <HeaderHoverBlock
            tab={hoverTab}
            onMouseEnter={onHeaderHoverBlockMouseEnter}
            onMouseLeave={onHeaderHoverBlockMouseLeave}
          />
        )}
      </section>
      {showAuthModal && <AuthModal modalShown={showAuthModal} />}
    </header>
  )
}

export default Header
