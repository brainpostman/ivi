import BasicLayout from '@/layouts/BasicLayout/BasicLayout'
import FilterBlock from '@/components/FilterBlock/FilterBlock'
import { GetServerSidePropsContext } from 'next'
import { getServerSession } from 'next-auth/next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useEffect, useRef, useState } from 'react'
import { authOptions } from '../api/auth/[...nextauth]'
import { getSerializableSession } from '@/utils/auth.util'
import { useRouter } from 'next/router'
import AdminMovie from '@/components/AdminMovie/AdminMovie'
import { ICRUDFilm, ICRUDGenre } from '@/types/api/ICrudMovie'
import Link from 'next/link'
import AdminGenres from '@/components/AdminGenres/AdminGenres'
import { IFilmsGetRequest } from '@/types/api/films.api.interface'
import { formatFilmsParams } from '@/formatters/filmsParams.format'
import { filmsAPI } from '@/api/queries/films.api'
import { staffsAPI } from '@/api/queries/staffs.api'
import { IStaffGetResponse } from '@/types/api/staffs.api.interface'
import { useSession } from 'next-auth/react'
import LanguageSwitcher from '@/components/LanguageSwitcher/LanguageSwitcher'
import Loader from '@/components/UI/Loader/Loader'
import Sort from '@/components/UI/Sort/Sort'
import styles from './index.module.scss'
import { normalizeKey } from '@/utils/normalize.utils'
import { filtersAPI } from '@/api/queries/filters.api'
import { authAPI } from '@/api/queries/auth.api'

interface IAdminProps {
  defaultFilms: string
  genres: string
  filterGenres: IStaffGetResponse[]
  countries: IStaffGetResponse[]
  directors: IStaffGetResponse[]
  actors: IStaffGetResponse[]
  totalCount: number
  maxCountScore: number
  minCountScore: number
  maxYear: number
  minYear: number
  maxRating: number
}

export const getServerSideProps = async ({
  locale,
  params,
  req,
  res,
}: GetServerSidePropsContext) => {
  const serverSession = await getServerSession(req, res, authOptions)
  const authSession = getSerializableSession(serverSession)
  if (!authSession) {
    return { redirect: { destination: '/auth/signin' } }
  } else if (!(await authAPI.checkAdminRole(authSession.accessToken))) {
    return { redirect: { destination: '/' } }
  }

  const defaultParams: IFilmsGetRequest = { take: 14, page: 1 }
  const currentParams = { ...formatFilmsParams(params), ...defaultParams }

  const {
    films,
    totalCount,
    maxCountScore,
    minCountScore,
    maxYear,
    minYear,
    maxRating,
  } = await filmsAPI.getCrudFilms(currentParams)
  const genres = JSON.stringify(await filtersAPI.getCrudGenres())
  const serializedFilms = JSON.stringify(films)
  const filterGenres = await filtersAPI.getGenres(locale ?? 'ru')
  const countries = await filtersAPI.getCountries()
  const directors = await staffsAPI.getDirectors()
  const actors = await staffsAPI.getActors()

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'ru', [
        'common',
        'admin',
        'movies',
      ])),
      defaultFilms: serializedFilms,
      maxCountScore,
      minCountScore,
      maxYear,
      minYear,
      genres,
      filterGenres,
      countries,
      directors,
      actors,
      totalCount,
    },
  }
}

export default function Admin({
  defaultFilms,
  genres,
  filterGenres,
  countries,
  directors,
  actors,
  totalCount,
  maxCountScore,
  minCountScore,
  maxYear,
  minYear,
  maxRating,
}: IAdminProps) {
  const tabs = ['movies', 'genres']

  const { t } = useTranslation()
  const router = useRouter()
  const [chosenTab, setChosenTab] = useState('movies')
  const { status } = useSession()
  const [isLoadedFirstFilms, setIsLoadedFirstFilms] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [totalItems, setTotalItems] = useState(totalCount)
  const [page, setPage] = useState(2)
  const [films, setFilms] = useState<ICRUDFilm[]>(
    JSON.parse(defaultFilms) || []
  )
  const [crudGenres, setCrudGenres] = useState<ICRUDGenre[]>(
    JSON.parse(genres) || []
  )
  const scrollFetchTrigger = useRef<HTMLDivElement>(null)
  const observer = useRef<IntersectionObserver>()

  const filterBlockProps = {
    countries,
    genres: filterGenres,
    directors,
    actors,
    className: styles.filters,
    clearSort: false,
    maxCountScore,
    minCountScore,
    maxYear,
    minYear,
    maxRating,
  }

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }
  }, [status])

  useEffect(() => {
    if (isLoading || !isLoadedFirstFilms || chosenTab !== 'movies') return
    if (observer.current) {
      observer.current.disconnect()
    }
    const callback = (
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver
    ) => {
      if (
        entries[0].isIntersecting &&
        films.length < (totalItems || totalCount)
      ) {
        setIsLoading(true)
      }
    }
    observer.current = new IntersectionObserver(callback)
    observer.current.observe(scrollFetchTrigger.current!)
  }, [isLoading])

  const getFilmsWithParams = () => {
    setPage(page + 1)

    const defaultParams: IFilmsGetRequest = { take: 14, page }
    const currentParams = {
      ...formatFilmsParams(router.query, router.locale ?? 'ru'),
      ...defaultParams,
    }

    filmsAPI
      .getCrudFilms(currentParams)
      .then(({ films, totalCount }) => {
        setFilms(prev => [...prev, ...films])
        setTotalItems(totalCount)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const getSortedGenres = () => {
    const requestParams = formatFilmsParams(router.query, router.locale ?? 'ru')
    requestParams.take = undefined
    requestParams.page = undefined
    filtersAPI
      .getCrudGenres(requestParams)
      .then(resp => {
        setCrudGenres(resp)
      })
      .finally(() => setIsLoading(false))
  }

  const changeTab = async (tabName: string) => {
    if (chosenTab !== tabName) {
      await router.push({ pathname: undefined, query: undefined }, undefined, {
        shallow: true,
      })
      setChosenTab(tabName)
    }
  }

  useEffect(() => {
    if (!defaultFilms || isLoadedFirstFilms) return
    setIsLoadedFirstFilms(true)
    setIsLoading(false)
  }, [defaultFilms])

  useEffect(() => {
    if (!isLoading || !isLoadedFirstFilms) return
    if (chosenTab === 'movies') {
      getFilmsWithParams()
    } else {
      getSortedGenres()
    }
  }, [isLoading])

  useEffect(() => {
    if (!router.query || !isLoadedFirstFilms || isLoading) return
    setPage(1)
    setFilms([])
    setIsLoading(true)
  }, [router.query])

  return (
    <BasicLayout title={t('admin:html-title')}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <div></div>
          <Link href={'/admin'}>
            <h1 className={styles.title}>{t('admin:page-title')}</h1>
          </Link>
          <LanguageSwitcher />
        </div>
        <div className={styles.db}>
          <section className={styles.db__input}>
            {chosenTab === 'movies' && (
              <article className={styles.controls}>
                <Sort
                  sortTypes={t('movies:sortTypes', {
                    returnObjects: true,
                  })}
                  defaultSort={''}
                />
                <FilterBlock {...filterBlockProps} />
              </article>
            )}
            {chosenTab === 'genres' && (
              <article className={styles.controls}>
                <Sort
                  sortTypes={t('admin:sortTypes', {
                    returnObjects: true,
                  })}
                  defaultSort={''}
                />
              </article>
            )}
          </section>
          <section className={styles.db__output}>
            <div className={styles.heading}>
              <div className={styles.heading__container}>
                <div className={styles.heading__pages}>
                  {tabs.map(str => {
                    return (
                      <h2
                        key={str}
                        className={`${styles.heading__page} ${
                          chosenTab === str ? styles.heading__page_active : ''
                        }`}
                        onClick={() => changeTab(str)}
                      >
                        {t(normalizeKey(`admin:${str}`))}
                      </h2>
                    )
                  })}
                </div>
                <div>
                  <Link href={'/'} className={styles.sitepages}>
                    <h2 className={styles.heading__page}>
                      {t('admin:home-page')}
                    </h2>
                  </Link>
                  <Link href={'/movies'} className={styles.sitepages}>
                    <h2 className={styles.heading__page}>
                      {t('admin:catalog')}
                    </h2>
                  </Link>
                </div>
              </div>
            </div>
            <div className={styles.database}>
              {chosenTab === 'movies' && (
                <div className={styles.database__movies}>
                  {films.map(film => {
                    return (
                      <AdminMovie
                        className={styles.database__movie}
                        key={film.id}
                        movie={film}
                      />
                    )
                  })}
                  <div
                    className={styles.scrolltrigger}
                    ref={scrollFetchTrigger}
                  ></div>
                  {isLoading && <Loader />}
                </div>
              )}
              {chosenTab === 'genres' &&
                (isLoading ? (
                  <Loader />
                ) : (
                  <AdminGenres setLoading={setIsLoading} genres={crudGenres} />
                ))}
            </div>
          </section>
        </div>
      </div>
    </BasicLayout>
  )
}
