import ExpandBlock from '@/components/UI/ExpandBlock/ExpandBlock'
import React, { FC } from 'react'
import IviRaiting from '@/components/IviRaiting/IviRaiting'
import WatchActors from '@/components/Watch/WatchActors/WatchActors'
import WatchBlock from '@/components/Watch/WatchBlock/WatchBlock'
import WatchFooter from '@/components/Watch/WatchFooter/WatchFooter'
import PageLayout from '@/layouts/PageLayout/PageLayout'
import { MdArrowBackIosNew } from 'react-icons/md'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetServerSideProps } from 'next'
import { filmsAPI } from '@/api/queries/films.api'
import { IMovie, IMovieById } from '@/types/api/films.api.interface'
import TrailerBlock from '@/components/TrailerBlock/TrailerBlock'
import FilmFields from '@/components/Watch/FilmFields/FilmFields'
import FilmFeatures from '@/components/Watch/FilmFeatures/FilmFeatures'
import FilmActors from '@/components/Watch/FilmActors/FilmActors'
import WatchReviews from '@/components/Watch/WatchReviews/WatchReviews'
import BreadCrumbsSpecificFilm from '@/components/UI/BreadCrumbs/BreadCrumbsSpecificFilm/BreadCrumbsSpecificFilm'
import Loader from '@/components/UI/Loader/Loader'
import MovieCarousel from '@/components/UI/Carousels/MovieCarousel/MovieCarousel'
import style from './watch.module.scss'
import styleMobile from './watch-mobile.module.scss'
import { useTranslation } from 'next-i18next'
import { reviewsAPI } from '@/api/queries/reviews.api'
import { IReviewGetResponse } from '@/types/api/reviews.api.interface'
import { useRouter } from 'next/router'

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  params,
}) => {
  if (!params || !parseInt(params.id as string)) {
    return {
      notFound: true,
    }
  }
  const reviewCount = await reviewsAPI.getFilmReviewCount(Number(params.id))
  const reviews = await reviewsAPI.getFilmReviews(Number(params.id))
  const film = await filmsAPI.getFilmsById(locale ?? 'ru', Number(params.id))
  const { films } = await filmsAPI.getFilms(locale ?? 'ru', { take: 19 })

  if (!film) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'ru', [
        'header',
        'auth_modal',
        'common',
        'footer',
        'watch',
      ])),
      film,
      films,
      reviewData: { reviewCount, reviews },
    },
  }
}

interface IProps {
  film: IMovieById
  films: IMovie[]
  reviewData: { reviewCount: number; reviews: IReviewGetResponse[] }
}

const WatchPage: FC<IProps> = ({ film, films, reviewData }) => {
  const { t } = useTranslation('watch')
  const router = useRouter()
  return (
    <PageLayout title={film.name}>
      <section className={style.wrapper}>
        <div className={style.back_button} onClick={() => router.back()}>
          <MdArrowBackIosNew />
          <p>{t('back')}</p>
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
            className={style.trailerblock}
            scoreAVG={film.scoreAVG}
          />

          <div className={style.container_info}>
            <h1 className={style.container_info__title}>{film.name}</h1>

            <FilmFields film={film} className={style.film_fields} />
            <FilmFeatures className={style.film_features} />

            <div className={style.films_actors_wrapper}>
              <FilmActors
                scoreAVG={film.scoreAVG}
                actors={film.actors.slice(0, 4)}
                className={styleMobile.film_actors_mobile}
              />
            </div>

            <div className={style.expand_block_wrapper}>
              <ExpandBlock
                visibleBlock={film.description}
                expandWord={t('film-details')}
              >
                <WatchBlock />
              </ExpandBlock>
            </div>

            <IviRaiting scoreAVG={film.scoreAVG} countScore={film.countScore} />
          </div>
        </div>
        {films ? <MovieCarousel films={films} /> : <Loader />}

        <div className={style.actors_wrapper}>
          <h1>{t('actors-n-creators')}</h1>
          <WatchActors film={film} />
        </div>

        <WatchReviews
          reviewData={reviewData}
          filmName={film.name}
          film={film}
        />
        <WatchFooter filmName={film.name} mainImg={film.mainImg} />
      </section>
    </PageLayout>
  )
}

export default WatchPage
