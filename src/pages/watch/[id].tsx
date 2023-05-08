import ExpandBlock from '@/components/ExpandBlock/ExpandBlock'
import TopTenList from '@/components/TopTenList/TopTenList'
import IviRaiting from '@/components/IviRaiting/IviRaiting'
import WatchActors from '@/components/WatchActors/WatchActors'
import WatchBlock from '@/components/WatchBlock/WatchBlock'
import WatchFooter from '@/components/WatchFooter/WatchFooter'
import { filmDetails, filmDetailsVisible } from '@/data/watch.data'
import PageLayout from '@/layouts/PageLayout/PageLayout'
import React, { useState } from 'react'
import { MdArrowBackIosNew } from 'react-icons/md'
import style from './watch.module.scss'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetServerSideProps } from 'next'
import { filmsAPI } from '@/api/queries/films.api'
import { IMovie } from '@/types/films.api.interface'
import TrailerBlock from '@/components/TrailerBlock/TrailerBlock'
import FilmFields from '@/components/FilmFields/FilmFields'
import FilmFeatures from '@/components/FilmFeatures/FilmFeatures'
import FilmActors from '@/components/FilmActors/FilmActors'
import WatchReviews from '@/components/WatchReviews/WatchReviews'

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  params,
}) => {
  const film = await filmsAPI.getFilmsById(Number(params!.id))
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'ru', [
        'header',
        'auth_modal',
        'common',
        'footer',
      ])),
      film,
    },
  }
}

interface IProps {
  film: IMovie
}

const Film: React.FC<IProps> = ({ film }) => {
  return (
    <PageLayout title='Фильм'>
      <section className={style.wrapper}>
        <div className={style.back_button}>
          <MdArrowBackIosNew />
          <p>Назад</p>
        </div>

        <div className={style.conteiner}>
          <TrailerBlock mainImg={film.mainImg} />

          <div className={style.conteiner_info}>
            <h1 className={style.conteiner_info__title}>{film.name}</h1>

            <FilmFields film={film} />
            <FilmFeatures />
            <FilmActors actors={film.actors.slice(0, 4)} />

            <div className={style.wrapper_details}>
              <ExpandBlock
                visibleBlock={film.description}
                width={450}
                lineClamp={5}
                expandWord='Детали о фильме'
              >
                <WatchBlock />
              </ExpandBlock>
            </div>

            <IviRaiting />
          </div>
        </div>
        <TopTenList />

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

export default Film
