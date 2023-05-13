import { useTypedSelector } from '@/hooks/ReduxHooks'
import { IHeaderBlock, IHeaderTab } from '@/types/header.interface'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import AuthWindow from '../AuthWindow/AuthWindow'
import HeaderMobile from '../Mobile/HeaderMobile/HeaderMobile'
import style from './Header.module.scss'
import HeaderHoverBlock from './HeaderHoverBlock/HeaderHoverBlock'
import HeaderLeftSide from './HeaderLeftSide/HeaderLeftSide'
import HeaderRightSide from './HeaderRightSide/HeaderRightSide'

const Header = () => {
  const { pathname } = useRouter()
  const [classNameHeader, setClassNameHeader] = useState(style.wrapper)
  const { showAuthModal } = useTypedSelector(state => state.authModal)

  const [hoverTabs, setHoverTabs] = useState<IHeaderBlock>({
    isShow: false,
    tab: undefined,
  })

  const classNameContainer =
    hoverTabs.isShow && hoverTabs.tab
      ? `${style.container} ${style.effect}`
      : style.container

  const showHoverBlock = (tab: IHeaderTab) => {
    setHoverTabs({ isShow: true, tab })
  }

  const hideHoverBlock = () => {
    setHoverTabs({ tab: undefined, isShow: false })
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
      <section className={classNameContainer} onMouseLeave={hideHoverBlock}>
        <HeaderLeftSide showHoverBlock={showHoverBlock} />
        <HeaderRightSide showHoverBlock={showHoverBlock} />
        {hoverTabs.isShow && hoverTabs.tab && (
          <HeaderHoverBlock
            hideHoverBlock={hideHoverBlock}
            tab={hoverTabs.tab}
          />
        )}
      </section>
      {showAuthModal && <AuthWindow modalShown={showAuthModal} />}
      <HeaderMobile />
    </header>
  )
}

export default Header
