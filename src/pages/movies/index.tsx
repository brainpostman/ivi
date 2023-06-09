import { filmsAPI } from '@/api/queries/films.api'
import CustomCarousel from '@/components/UI/Carousels/CustomCarousel/CustomCarousel'
import ExpandBlock from '@/components/UI/ExpandBlock/ExpandBlock'
import FilterBlock from '@/components/FilterBlock/FilterBlock'
import MovieCardGrid from '@/components/MovieCardGrid/MovieCardGrid'
import Sort from '@/components/UI/Sort/Sort'
import ViewMoreButton from '@/components/UI/Buttons/ViewMoreButton/ViewMoreButton'
import VioletButton from '@/components/UI/Buttons/VioletButton/VioletButton'
import PageLayout from '@/layouts/PageLayout/PageLayout'
import { IFilmsGetRequest, IMovie } from '@/types/api/films.api.interface'
import { GetServerSideProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import style from './index.module.scss'
import Loader from '@/components/UI/Loader/Loader'
import { IStaffGetResponse } from '@/types/api/staffs.api.interface'
import { formatFilmsParams } from '@/formatters/filmsParams.format'
import { staffsAPI } from '@/api/queries/staffs.api'
import BreadCrumbsFilms from '@/components/UI/BreadCrumbs/BreadCrumbsFilms/BreadCrumbsFilms'
import { IFilterGetResponse } from '@/types/api/filters.api.interface'
import { filtersAPI } from '@/api/queries/filters.api'
import { useSetListParam } from '@/hooks/useSetListParam'
import getFilterClassName from '@/utils/filterClassName.utils'

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  query,
}) => {
  const defaultParams: IFilmsGetRequest = { take: 14, page: 1 }

  const currentParams = { ...formatFilmsParams(query), ...defaultParams }

  const {
    films,
    totalCount,
    maxYear,
    minYear,
    maxCountScore,
    minCountScore,
    maxRating,
  } = await filmsAPI.getFilms(locale ?? 'ru', currentParams)

  const genres = await filtersAPI.getGenres(locale ?? 'ru')
  const countries = await filtersAPI.getCountries()

  const directors = await staffsAPI.getDirectors()
  const actors = await staffsAPI.getActors()

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'ru', [
        'header',
        'auth_modal',
        'error',
        'common',
        'footer',
        'movies',
      ])),
      defaultFilms: films,
      directors,
      actors,
      totalCount,
      genres,
      countries,
      minYear,
      maxYear,
      minCountScore,
      maxCountScore,
      maxRating,
    },
  }
}

interface IProps {
  defaultFilms: IMovie[]
  directors: IStaffGetResponse[]
  actors: IStaffGetResponse[]
  totalCount: number
  maxYear: number
  minYear: number
  minCountScore: number
  maxCountScore: number
  maxRating: number
  genres: IFilterGetResponse[]
  countries: IFilterGetResponse[]
}

const MoviesPage: NextPage<IProps> = ({
  defaultFilms,
  directors,
  actors,
  totalCount,
  maxYear,
  minYear,
  genres,
  countries,
  minCountScore,
  maxCountScore,
  maxRating,
}) => {
  const router = useRouter()
  const { t } = useTranslation('movies')

  const [isLoadedFirstFilms, setIsLoadedFirstFilms] = useState(false)
  const [isClickedViewMore, setIsClickedViewMore] = useState(false)
  const [page, setPage] = useState(2)
  const [films, setFilms] = useState<IMovie[]>(defaultFilms || [])
  const [paginationCount, setPaginationCount] = useState(totalCount)

  const defaultSort = 'year'

  const urlGenres = (router.query.genres as string | undefined) || ''

  const [isLoading, setIsLoading] = useState(true)

  const { onClickListEl } = useSetListParam(
    countries.slice(0, 20).map(country => ({ ...country, isSelect: false })),
    'countries'
  )

  const getFilmsWithParams = () => {
    // Не работает через prev => prev++
    setPage(page + 1)

    const defaultParams: IFilmsGetRequest = { take: 14, page }
    const currentParams = {
      ...formatFilmsParams(router.query),
      ...defaultParams,
    }

    filmsAPI
      .getFilms(router.locale ?? 'ru', currentParams)
      .then(({ films, totalCount }) => {
        setFilms(prev => [...prev, ...films])
        // totalCount не приходит на клиент
        //setPaginationCount(totalCount)
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
      films.length < paginationCount
    ) {
      setIsLoading(true)
    }
  }

  useEffect(() => {
    setIsLoadedFirstFilms(true)
    setIsLoading(false)
  }, [defaultFilms])

  useEffect(() => {
    if (!isLoading || !isLoadedFirstFilms) return
    getFilmsWithParams()
  }, [isLoading])

  // Запрос при изменении фильтров
  useEffect(() => {
    const queries = router.query
    const orderBy = queries.orderBy
    const order = queries.order

    const filteredKeys = Object.keys(queries).filter(
      filter => !['orderBy', 'order'].includes(filter)
    )

    if (
      !isLoadedFirstFilms ||
      isLoading ||
      (!filteredKeys.length && (order || orderBy))
    )
      return

    setPage(1)
    setFilms([])
    setIsLoading(true)
  }, [router.query])

  useEffect(() => {
    if (!isClickedViewMore) return
    document.addEventListener('scroll', onScroll)

    return () => document.removeEventListener('scroll', onScroll)
  }, [isClickedViewMore, films])

  return (
    <PageLayout title={t('html-title')}>
      <section className={style.wrapper}>
        <BreadCrumbsFilms genres={urlGenres} />
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
              <VioletButton
                key={country.id}
                onClick={onClickListEl(country.name)}
                className={getFilterClassName(
                  country.name,
                  style.filter_country_card_active,
                  router.query.countries as string | undefined
                )}
              >
                {country.name}
              </VioletButton>
            ))}
          </CustomCarousel>
        </div>
        {!!Object.keys(router.query).length && (
          <Sort
            sortTypes={t('sortTypes', { returnObjects: true })}
            defaultSort={defaultSort}
          />
        )}
        <FilterBlock
          countries={countries}
          genres={genres}
          directors={directors}
          actors={actors}
          minYear={minYear}
          maxYear={maxYear}
          minCountScore={minCountScore}
          maxCountScore={maxCountScore}
          maxRating={maxRating}
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
