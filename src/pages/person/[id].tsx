import ExpandBlock from '@/components/ExpandBlock/ExpandBlock'
import BasicBtn from '@/components/UI/BasicBtn/BasicBtn'
import PageLayout from '@/layouts/PageLayout/PageLayout'
import { getCoordY, scrollMove } from '@/utils/coords.utils'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { MdArrowBackIosNew } from 'react-icons/md'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetServerSideProps } from 'next'
import { IStaff } from '@/types/staffs.interface'
import { staffsAPI } from '@/api/queries/staffs.api'
import { filmsAPI } from '@/api/queries/films.api'
import { IFilmsGetRequest, IMovie } from '@/types/films.api.interface'
import { formatStaffType } from '@/formatters/staffType.format'
import Link from 'next/link'
import style from './staff.module.scss'

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  params,
}) => {
  if (!params || !parseInt(params.id as string)) {
    return {
      redirect: {
        destination: '/error',
        permanent: false,
      },
    }
  }

  const id = +params!.id!

  const staff = await staffsAPI.getStaffById(id)

  if (!staff) {
    return {
      redirect: {
        destination: '/error',
        permanent: false,
      },
    }
  }

  let films: IMovie[] = []
  let currentTotalCount = 0
  const currentParams: IFilmsGetRequest = { take: 17 }
  const formattedStaffType = formatStaffType(staff?.type)
  if (formattedStaffType) {
    currentParams[formattedStaffType] = [staff.name]

    const { films: filmsIncoming, totalCount } = await filmsAPI.getFilms(
      currentParams
    )

    if (filmsIncoming) {
      films = filmsIncoming
      currentTotalCount = totalCount
    }
  }

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'ru', [
        'header',
        'auth_modal',
        'common',
        'footer',
      ])),
      staff,
      films,
      totalCount: currentTotalCount,
    },
  }
}

interface IProps {
  staff: IStaff
  films: IMovie[]
  totalCount: number
  error?: string | string[]
}

const Actor: React.FC<IProps> = ({
  staff,
  films: filmsIncoming,
  totalCount,
}) => {
  const [films, setFilms] = useState(filmsIncoming)
  const [page, setPage] = useState(2)

  const router = useRouter()
  const [biografyRef, setBiografyRef] = useState<HTMLHeadingElement | null>(
    null
  )

  const [filmographyRef, setFilmographyRef] =
    useState<HTMLHeadingElement | null>(null)

  const countMoreFilms = totalCount - films.length

  const onClickBackButton = () => {
    router.back()
  }

  const onClickMoreFilms = async () => {
    const { films } = await filmsAPI.getFilms({
      take: 17,
      page,
      [staff.type]: [staff.name],
    })
    setFilms(prev => [...prev, ...films])
    setPage(page + 1)
  }

  const onClickBiografy = () => scrollMove(getCoordY(filmographyRef))
  const onClickFilms = () => scrollMove(getCoordY(biografyRef))

  return (
    <PageLayout title={staff.name}>
      <section className={style.wrapper}>
        <div className={style.back_button} onClick={onClickBackButton}>
          <MdArrowBackIosNew />
          <p>Назад</p>
        </div>

        <article className={style.container}>
          {/*PERSON CONTAINER*/}
          <div>
            <Image
              src='/film/noPhotoIcon60x60.png'
              alt='avatar'
              width={120}
              height={120}
              className={style.img}
            />
            <div className={style.info_container}>
              <h1 className={style.info_container__title}>{staff.name}</h1>
              <h2 className={style.info_container__subtitle}>{staff.name}</h2>
              <ExpandBlock
                visibleBlock={staff.biography}
                width='100%'
                expandWordGray
              >
                {staff.biography}
              </ExpandBlock>
              <div className={style.info_buttons}>
                <p onClick={onClickBiografy}>{films.length} фильмов</p>
                <p onClick={onClickFilms}>Биография</p>
              </div>
            </div>
          </div>

          <div className={style.films_wrapper}>
            <div className={style.films_header}>
              <h1
                className={style.films_header__title}
                ref={ref => setFilmographyRef(ref)}
              >
                Полная фильмография
              </h1>
              <p className={style.films_header__subtitle}>
                {films.length} фильмов
              </p>
            </div>

            <div className={style.wrapper_film_list}>
              {/*FILM LIST*/}
              <ul className={style.films_list}>
                {films.map(film => (
                  <li key={film.id}>
                    <Link href={`/watch/${film.id}`}>
                      <div className={style.films_list__card}>
                        <Image
                          src={film.mainImg}
                          alt={film.name}
                          width={80}
                          height={122}
                          className={style.img}
                        />
                        <div className={style.film_info}>
                          <p>{film.year}</p>
                          <p className={style.film_info__title}>{film.name}</p>
                          <p className={style.film_info__rating}>
                            Рейтинг Иви: 8,9
                          </p>
                          <BasicBtn className={style.button_mobile}>
                            Подробнее
                          </BasicBtn>
                        </div>
                      </div>
                      <BasicBtn className={style.button}>Подробнее</BasicBtn>
                    </Link>
                  </li>
                ))}
              </ul>
              {!!countMoreFilms && (
                <p className={style.more_films} onClick={onClickMoreFilms}>
                  Eще {countMoreFilms} фильмов
                </p>
              )}
            </div>
          </div>
          <div className={style.biografy}>
            <h2 ref={ref => setBiografyRef(ref)}>Биография</h2>
            <ExpandBlock
              visibleBlock={staff.biography}
              width='100%'
              lineClamp={16}
              expandWord={'Читать дальше'}
              expandWordGray
            >
              {staff.biography}
            </ExpandBlock>
          </div>
        </article>
      </section>
    </PageLayout>
  )
}

export default Actor
