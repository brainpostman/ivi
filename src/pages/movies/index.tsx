import { getFilms } from '@/api_queries/films.api'
import CustomCarousel from '@/components/CustomCarousel/CustomCarousel'
import ExpandBlock from '@/components/ExpandBlock/ExpandBlock'
import FilterBlock from '@/components/FilterBlock/FilterBlock'
import MovieCardGrid from '@/components/MovieCardGrid/MovieCardGrid'
import Sort from '@/components/Sort/Sort'
import ViewMoreButton from '@/components/UI/ViewMoreButton/ViewMoreButton'
import VioletButton from '@/components/UI/VioletButton/VioletButton'
import PageLayout from '@/layouts/PageLayout'
import { IMovie } from '@/types/films.api.interface'
import { GetServerSideProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import style from './index.module.scss'
import Loader from '@/components/Loader/Loader'

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const defaultFilmsData = await getFilms({ page: 1, take: 21 })

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'ru', [
        'header',
        'auth_modal',
        'common',
        'footer',
        'movies',
      ])),
      defaultFilmsData,
    },
  }
}

interface IProps {
  defaultFilmsData: IMovie[]
}

const MoviesPage: NextPage<IProps> = ({ defaultFilmsData }) => {
  const router = useRouter()
  const { t } = useTranslation('movies')
  const [isClickedViewMode, setIsClickedViewMore] = useState(false)
  const [films, setFilms] = useState(defaultFilmsData)
  const [page, setPage] = useState(1)

  // Лоадер при первой загрузке
  const [isLoadingDefault, setIsLoadingDefault] = useState(true)
  // Лоадер при последующих запросах
  const [isLoading, setIsLoading] = useState(false)

  const getFilmsWithParams = async () => {
    setPage(prev => prev++)

    await getFilms({ page, take: 14 })
      .then(films => {
        setFilms(prev => [...prev, ...films])
      })
      .finally(() => setIsLoading(false))
  }

  const onClickViewMore = () => {
    setIsClickedViewMore(true)
    setIsLoading(true)
    getFilmsWithParams()
  }

  const onScroll = () => {
    if (!isClickedViewMode) return

    const docElement = document.documentElement
    if (
      docElement.scrollHeight - (docElement.scrollTop + window.innerHeight) <
      400
    ) {
      console.log('WORK!')
      setIsLoading(true)
    }
  }

  useEffect(() => {
    if (!films) return

    if (isLoadingDefault) setIsLoadingDefault(false)
  }, [films])

  useEffect(() => {
    if (!isLoading) return
    getFilmsWithParams()
  }, [isLoading])

  useEffect(() => {
    document.addEventListener('scroll', onScroll)

    return () => document.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <PageLayout title={t('html-title')}>
      <section className={style.wrapper}>
        {/*BREAD CRUMBS*/}
        <h1 className={style.title}>{t('heading')}</h1>
        <ExpandBlock
          visibleBlock={t('movie-page-info', { returnObjects: true })[0]}
        >
          <div className={style.info}>
            {t('movie-page-info', { returnObjects: true })
              .slice(1)
              .map((info, index) => (
                <p key={index}>{info}</p>
              ))}
          </div>
        </ExpandBlock>
        <CustomCarousel
          elementsView={8}
          elementsMove={2}
          arrowSize={16}
          classNameWrapper={style.carousel_wrapper}
          space={[12, 12]}
        >
          {t('filter-categories', { returnObjects: true }).map(filter => (
            <VioletButton key={filter}>{filter}</VioletButton>
          ))}
        </CustomCarousel>
        {!!Object.keys(router.query).length && <Sort />}
        <FilterBlock />
        <div className={style.moviegrid_wrapper}>
          {isLoadingDefault ? (
            <Loader />
          ) : (
            <MovieCardGrid
              movies={films || []}
              className={style.moviegrid_container}
            />
          )}
          {isLoading && <Loader />}
          {!isClickedViewMode && <ViewMoreButton onClick={onClickViewMore} />}
        </div>
      </section>
    </PageLayout>
  )
}

export default MoviesPage
