import { useTypedSelector } from '@/hooks/ReduxHooks'
import { IHeaderBlock, IHeaderTab } from '@/types/header.interface'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import AuthWindow from '@/components/AuthWindow/AuthWindow'
import HeaderMobile from '@/components/Mobile/HeaderMobile/HeaderMobile'
import style from './Header.module.scss'
import HeaderHoverBlock from './HeaderHoverBlock/HeaderHoverBlock'
import HeaderLeftSide from './HeaderLeftSide/HeaderLeftSide'
import HeaderRightSide from './HeaderRightSide/HeaderRightSide'
import { IFilterGetResponse } from '@/types/api/filters.api.interface'
import { FiltersContext } from '@/contexts/filters.context'
import { filtersAPI } from '@/api/queries/filters.api'
import { filmsAPI } from '@/api/queries/films.api'
import { IMovie } from '@/types/api/films.api.interface'

const Header = () => {
  const { pathname, locale } = useRouter()
  const [classNameHeader, setClassNameHeader] = useState(style.wrapper)
  const { showAuthModal } = useTypedSelector(state => state.authModal)

  const [genres, setGenres] = useState<IFilterGetResponse[]>([])
  const [countries, setCountries] = useState<IFilterGetResponse[]>([])

  const [miniCarouselFilms, setMiniCarouselFilms] = useState<IMovie[]>([])

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

  const getAndSetFilters = async () => {
    const countriesIncoming = await filtersAPI.getCountries()
    const genresIncoming = await filtersAPI.getGenres(locale ?? 'ru')

    setCountries(countriesIncoming.slice(0, 22))
    setGenres(genresIncoming.slice(0, 22))
  }

  const getMiniCarouselFilms = async () => {
    const { films } = await filmsAPI.getFilms(locale ?? 'ru', { take: 30 })
    setMiniCarouselFilms(films)
  }

  useEffect(() => {
    getAndSetFilters()
    getMiniCarouselFilms()
  }, [])

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
            genres={genres}
            countries={countries}
            films={miniCarouselFilms}
          />
        )}
      </section>
      {showAuthModal && (
        <AuthWindow modalShown={showAuthModal} isModal={true} />
      )}

      <FiltersContext.Provider value={{ genres, countries }}>
        <HeaderMobile />
      </FiltersContext.Provider>
    </header>
  )
}

export default Header
