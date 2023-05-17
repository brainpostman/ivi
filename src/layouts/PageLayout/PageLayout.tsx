import Footer from '@/components/Footer/Footer'
import HeadModif from '@/components/HeadModif/HeadModif'
import Header from '@/components/Header/Header'
import { IHead } from '@/types/head.interface'
import { FC, PropsWithChildren, useEffect } from 'react'
import style from './PageLayout.module.scss'
import { useActions } from '@/hooks/ReduxHooks'
import { staffsAPI } from '@/api/queries/staffs.api'
import { useRouter } from 'next/router'

const PageLayout: FC<PropsWithChildren<IHead>> = ({ children, ...props }) => {
  const { setFilters } = useActions()
  const { locale } = useRouter()

  const setterFilters = async () => {
    const genres = await staffsAPI.getGenres(locale ?? 'ru')
    const countries = await staffsAPI.getCountries()
    setFilters({ genres, countries })
  }

  useEffect(() => {
    setterFilters()
  }, [])
  return (
    <>
      <HeadModif {...props} />
      <div className={style.wrapper}>
        <Header />
        <main className={style.container}>{children}</main>
        <Footer />
      </div>
    </>
  )
}

export default PageLayout
