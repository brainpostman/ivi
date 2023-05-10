import ExpandBlock from '@/components/ExpandBlock/ExpandBlock'
import BasicBtn from '@/components/UI/BasicBtn/BasicBtn'
import {
  acortTopInfoVisibleData,
  actorBiografyData,
  actorBiografyInfoVisibleData,
  actorFilmsData,
} from '@/data/person.data'
import PageLayout from '@/layouts/PageLayout/PageLayout'
import { getCoordY, scrollMove } from '@/utils/coords.utils'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { RefObject, useRef, useState } from 'react'
import { MdArrowBackIosNew } from 'react-icons/md'
import style from './actors.module.scss'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'ru', [
        'header',
        'auth_modal',
        'common',
        'footer',
      ])),
      // Will be passed to the page component as props
    },
  }
}

export default function Actor() {
  const router = useRouter()
  const biografyRef = useRef<HTMLHeadingElement>(null)
  const filmographyRef = useRef<HTMLHeadingElement>(null)

  const [isExpand, setIsExpand] = useState(false)

  const defaultMovies = actorFilmsData.slice(0, 7)
  const allMovies = actorFilmsData

  const onClickExpandButton = () => {
    setIsExpand(true)
  }

  const onClickBackButton = () => {
    router.back()
  }

  return (
    <PageLayout title='Актёр'>
      <section className={style.wrapper}>
        <div className={style.back_button} onClick={onClickBackButton}>
          <MdArrowBackIosNew />
          <p>Назад</p>
        </div>

        <article className={style.container}>
          {/*PERSON CONTAINER*/}
          <div>
            <Image
              src='https://thumbs.dfs.ivi.ru/storage5/contents/9/6/b7f9eef3eaeb3d500cd994fb130047.jpg/120x144/?q=85'
              alt='avatar'
              width={120}
              height={120}
              className={style.img}
            />
            <div className={style.info_container}>
              <h1 className={style.info_container__title}>Оскар Айзек</h1>
              <h2 className={style.info_container__subtitle}>Oscar Isaak</h2>
              <ExpandBlock visibleBlock={acortTopInfoVisibleData} width='100%'>
                Коэн «Внутри Льюина Дэвиса».
              </ExpandBlock>
              <div className={style.info_buttons}>
                <p onClick={scrollMove(getCoordY(filmographyRef))}>
                  47 фильмов
                </p>
                <p onClick={scrollMove(getCoordY(biografyRef))}>Биография</p>
              </div>
            </div>
          </div>

          <div className={style.films_wrapper}>
            <div className={style.films_header}>
              <h1 className={style.films_header__title} ref={filmographyRef}>
                Полная фильмография
              </h1>
              <p className={style.films_header__subtitle}>47 фильмов</p>
            </div>

            {/*FILM LIST*/}
            <ul className={style.films_list}>
              {(isExpand ? allMovies : defaultMovies).map(film => (
                <li key={film.id}>
                  <div className={style.films_list__card}>
                    <Image
                      src={film.image}
                      alt={film.title}
                      width={80}
                      height={122}
                      className={style.img}
                    />
                    <div className={style.film_info}>
                      <p>{film.year}</p>
                      <p className={style.film_info__title}>{film.title}</p>
                      <p className={style.film_info__rating}>
                        Рейтинг Иви: {film.rating}
                      </p>
                    </div>
                  </div>
                  <BasicBtn className={style.button}>Подробнее</BasicBtn>
                </li>
              ))}
            </ul>
            {!isExpand && (
              <p className={style.more_films} onClick={onClickExpandButton}>
                Eще 39 фильмов
              </p>
            )}
          </div>
          <div className={style.biografy}>
            <h2 ref={biografyRef}>Биография</h2>
            <ExpandBlock
              visibleBlock={actorBiografyInfoVisibleData}
              width='100%'
            >
              {actorBiografyData}
            </ExpandBlock>
          </div>
        </article>
      </section>
    </PageLayout>
  )
}
