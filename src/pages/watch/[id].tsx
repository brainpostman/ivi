import ExpandBlock from '@/components/ExpandBlock/ExpandBlock'
import React, { FC } from 'react'
import IviRaiting from '@/components/IviRaiting/IviRaiting'
import WatchActors from '@/components/WatchActors/WatchActors'
import WatchBlock from '@/components/WatchBlock/WatchBlock'
import WatchFooter from '@/components/WatchFooter/WatchFooter'
import PageLayout from '@/layouts/PageLayout/PageLayout'
import { MdArrowBackIosNew } from 'react-icons/md'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetServerSideProps } from 'next'
import { filmsAPI } from '@/api/queries/films.api'
import { IMovie, IMovieById } from '@/types/films.api.interface'
import TrailerBlock from '@/components/TrailerBlock/TrailerBlock'
import FilmFields from '@/components/FilmFields/FilmFields'
import FilmFeatures from '@/components/FilmFeatures/FilmFeatures'
import FilmActors from '@/components/FilmActors/FilmActors'
import WatchReviews from '@/components/WatchReviews/WatchReviews'
import BreadCrumbsSpecificFilm from '@/components/BreadCrumbs/BreadCrumbsSpecificFilm/BreadCrumbsSpecificFilm'
import Loader from '@/components/Loader/Loader'
import MovieCarousel from '@/components/MovieCarousel/MovieCarousel'
import style from './watch.module.scss'
import styleMobile from './watch-mobile.module.scss'

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

  const film = await filmsAPI.getFilmsById(Number(params.id))
  const { films } = await filmsAPI.getFilms({ take: 19 })

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'ru', [
        'header',
        'auth_modal',
        'common',
        'footer',
      ])),
      film,
      films,
    },
  }
}

interface IProps {
  film: IMovieById
  films: IMovie[]
}

const FilmPage: FC<IProps> = ({ film, films }) => {
  return (
    <PageLayout title={film.name}>
      <section className={style.wrapper}>
        <div className={style.back_button}>
          <MdArrowBackIosNew />
          <p>Назад</p>
        </div>

        {/*MOBILE FILM TITLE*/}
        <h1 className={styleMobile.film_title_mobile}>{film.name}</h1>

        {/*MOBILE FILM FIELDS*/}
        <FilmFields film={film} className={styleMobile.film_fields_mobile} />
        <FilmFeatures className={styleMobile.film_features_mobile} />

        <BreadCrumbsSpecificFilm genre={film.genres.split(',')[0]} />

        <div className={style.container}>
          <TrailerBlock
            mainImg={film.mainImg}
            actors={film.actors.slice(0, 4)}
            scoreAVG={film.scoreAVG}
          />

          <div className={style.container_info}>
            <h1 className={style.container_info__title}>{film.name}</h1>

            <FilmFields film={film} className={style.film_fields} />
            <FilmFeatures className={style.film_features} />

            <div className={style.films_actors_wrapper}>
              <FilmActors
                actors={film.actors.slice(0, 4)}
                className={styleMobile.film_actors_mobile}
                scoreAVG={film.scoreAVG}
              />
            </div>

            <div className={style.expand_block_wrapper}>
              <ExpandBlock
                visibleBlock={film.description}
                expandWord='Детали о фильме'
              >
                <WatchBlock />
              </ExpandBlock>
            </div>

            <IviRaiting scoreAVG={film.scoreAVG} />
          </div>
        </div>
        {films ? <MovieCarousel films={films} /> : <Loader />}

        <div className={style.actors_wrapper}>
          <h1>Актеры и создатели</h1>
          <WatchActors film={film} />
        </div>

        <WatchReviews filmName={film.name} />
        <WatchFooter filmName={film.name} mainImg={film.mainImg} />
      </section>
    </PageLayout>
  )
}

export default FilmPage
