import { filmsAPI } from '@/api/queries/films.api'
import CustomCarousel from '@/components/CustomCarousel/CustomCarousel'
import ExpandBlock from '@/components/ExpandBlock/ExpandBlock'
import FilterBlock from '@/components/FilterBlock/FilterBlock'
import MovieCardGrid from '@/components/MovieCardGrid/MovieCardGrid'
import Sort from '@/components/Sort/Sort'
import ViewMoreButton from '@/components/UI/ViewMoreButton/ViewMoreButton'
import VioletButton from '@/components/UI/VioletButton/VioletButton'
import PageLayout from '@/layouts/PageLayout'
import { IFilmsGetRequest, IMovie } from '@/types/films.api.interface'
import { GetStaticProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import style from './index.module.scss'
import Loader from '@/components/Loader/Loader'
import { IFilterGetResponse } from '@/types/filters.api.interface'
import { formatFilmsParams } from '@/formatters/filmsParams.format'
import { filtersAPI } from '@/api/queries/filters.api'

export const getStaticProps: GetStaticProps = async ({ locale, params }) => {
  const defaultParams: IFilmsGetRequest = { take: 14, page: 1 }
  const currentParams = { ...formatFilmsParams(params), ...defaultParams }

  const { films, totalCount } = await filmsAPI.getFilms(currentParams)
  const genres = await filtersAPI.getGenres()
  const countries = await filtersAPI.getCountries()
  const directors = await filtersAPI.getDirectors()
  const actors = await filtersAPI.getActors()

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'ru', [
        'header',
        'auth_modal',
        'common',
        'footer',
        'movies',
      ])),
      defaultFilms: films,
      genres,
      countries,
      directors,
      actors,
      totalCount,
    },
  }
}

interface IProps {
  defaultFilms: IMovie[]
  genres: IFilterGetResponse[]
  countries: IFilterGetResponse[]
  directors: IFilterGetResponse[]
  actors: IFilterGetResponse[]
  totalCount: number
}

const MoviesPage: NextPage<IProps> = ({
  defaultFilms,
  countries,
  genres,
  directors,
  actors,
  totalCount,
}) => {
  const router = useRouter()
  const { t } = useTranslation('movies')

  const [isLoadedFirstFilms, setIsLoadedFirstFilms] = useState(false)
  const [isClickedViewMore, setIsClickedViewMore] = useState(false)
  const [page, setPage] = useState(2)
  const [films, setFilms] = useState<IMovie[]>(defaultFilms)

  const [isLoading, setIsLoading] = useState(true)

  const getFilmsWithParams = () => {
    // Не работает через prev => prev++
    setPage(page + 1)

    const defaultParams: IFilmsGetRequest = { take: 14, page }
    const currentParams = {
      ...formatFilmsParams(router.query),
      ...defaultParams,
    }

    filmsAPI
      .getFilms(currentParams)
      .then(({ films, totalCount }) => {
        setFilms(prev => [...prev, ...films])
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const onClickViewMore = () => {
    setIsClickedViewMore(true)
    setIsLoading(true)
  }

  const onScroll = () => {
    const docElement = document.documentElement
    if (
      docElement.scrollHeight - (docElement.scrollTop + window.innerHeight) <
        800 &&
      films.length < totalCount
    ) {
      setIsLoading(true)
    }
  }

  useEffect(() => {
    if (!defaultFilms || isLoadedFirstFilms) return

    setIsLoadedFirstFilms(true)
    setIsLoading(false)
  }, [defaultFilms])

  useEffect(() => {
    if (!isLoading || !isLoadedFirstFilms) return

    getFilmsWithParams()
  }, [isLoading])

  // Запрос при изменении фильтров
  useEffect(() => {
    // TODO: нужно ли условие !router.query ?
    if (!router.query || !isLoadedFirstFilms || isLoading) return

    setPage(1)
    setFilms([])
    setIsLoading(true)
  }, [router.query])

  useEffect(() => {
    if (!isClickedViewMore) return
    document.addEventListener('scroll', onScroll)

    return () => document.removeEventListener('scroll', onScroll)
  }, [isClickedViewMore])

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
        <div className={style.top_carousel_wrapper}>
          <CustomCarousel
            elementsView={12}
            elementsMove={2}
            arrowSize={16}
            classNameWrapper={style.carousel_wrapper}
            space={[12, 12]}
            width='fit'
          >
            {countries?.slice(0, 20).map(country => (
              <VioletButton key={country.id}>{country.name}</VioletButton>
            ))}
          </CustomCarousel>
        </div>
        {!!Object.keys(router.query).length && <Sort />}
        <FilterBlock
          countries={countries}
          genres={genres}
          directors={directors}
          actors={actors}
        />
        <div className={style.moviegrid_wrapper}>
          <MovieCardGrid
            movies={films || []}
            className={style.moviegrid_container}
          />
          {isLoading && <Loader />}
          {!isClickedViewMore && <ViewMoreButton onClick={onClickViewMore} />}
        </div>
      </section>
    </PageLayout>
  )
}

export default MoviesPage
