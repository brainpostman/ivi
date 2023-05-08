import ExpandBlock from '@/components/ExpandBlock/ExpandBlock'
import TopTenList from '@/components/TopTenList/TopTenList'
import IviRaiting from '@/components/UI/IviRaiting/IviRaiting'
import WatchActors from '@/components/WatchActors/WatchActors'
import WatchBlock from '@/components/WatchBlock/WatchBlock'
import WatchFooter from '@/components/WatchFooter/WatchFooter'
import PageLayout from '@/layouts/PageLayout'
import React from 'react'
import { MdArrowBackIosNew } from 'react-icons/md'
import style from './watch.module.scss'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetServerSideProps } from 'next'
import Image from 'next/image'
import axios from 'axios'

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  params,
}) => {
  const film = await getFilm(params?.id)
  console.log(film)
  return {
    props: {
      film,
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

export const getFilm = async (id: any) => {
  const response = await axios.get<FilmID[]>(
    `http://188.120.248.77:80/films/${id}`
  )
  return response.data
}
export interface FilmID {
  mainImg: string
  film: {
    id: number
    name: string
    name_en: string
    type: string
    mainImg: string
    year: number
    tagline: string
    budget: string
    fees: string
    feesUs: string
    feesRu: string
    premiere: string
    premiereRu: string
    releaseDVD: string
    releaseBluRay: string
    age: string
    ratingMPAA: string
    time: string
    description: string
    scoreAVG: null
    createdAt?: string
    updatedAt?: string
    countries: { id: number; name: string }[]
    genres: { id: number; name: string }[]
    operators: { id: number; name: string }[]
    compositors: { id: number; name: string }[]
    actors: { id: number; name: string }[]
    artists: { id: number; name: string }[]
    directors: { id: number; name: string }[]
    montages: { id: number; name: string }[]
    scenario: { id: number; name: string }[]
    spectators: { id: number; name: string }[]
  }
}

const Film: React.FC<FilmID> = ({ film }) => {
  let mainImg = ''
  if (film.mainImg.startsWith('https:') === true) {
    mainImg = film.mainImg
  } else {
    mainImg = `https:${film.mainImg}`
  }
  return (
    <PageLayout title='Фильм'>
      <section className={style.wrapper}>
        <div className={style.back_button}>
          <MdArrowBackIosNew />
          <p>Назад</p>
        </div>

        <div className={style.conteiner}>
          <div className={style.conteiner_film}>
            <div className={style.conteiner_film_area}>
              <Image src={mainImg} width={719} height={404} alt='трейлер' />
            </div>
            <div className={style.conteiner_film_buttons}>
              <button className={style.conteiner_film_buttons_play}>
                <Image
                  src='/film/playIcon.png'
                  alt='играть'
                  width={16}
                  height={16}
                />
                <h4>Трейлер</h4>
              </button>
              <button className={style.conteiner_film_buttons_favourite}>
                <Image
                  src='/film/favouritIcon.png'
                  alt='любимый'
                  width={16}
                  height={16}
                />
              </button>
              <button className={style.conteiner_film_buttons_share}>
                <Image
                  src='/film/shareIcon.png'
                  alt='поделиться'
                  width={16}
                  height={16}
                />
              </button>
              <div className={style.conteiner_film_buttons_catalog}>
                <Image
                  src='/film/catalogIcon.png'
                  alt='каталог'
                  width={16}
                  height={16}
                />
                <h4>Бесплатные фильмы</h4>
              </div>
            </div>
          </div>

          <div className={style.conteiner_info}>
            <h1 className={style.conteiner_info_title}> {film.name}</h1>
            <h4 className={style.conteiner_info_subtitle}>
              {' '}
              {film.year} {film.time} {film.age}{' '}
            </h4>

            <div className={style.conteiner_info_genres}>
              <h4>{film.countries.map(country => country.name).join(' ')}</h4>
              <h4>{film.genres.map(genre => genre.name).join(' ')}</h4>
            </div>

            <div className={style.conteiner_info_feature}>
              <div className={style.icon_fullhd}>
                <div className={style.icon_text}> FullHD </div>
              </div>
              <Image
                src='/film/soundIcon.png'
                width={15}
                height={15}
                alt='звук рус'
              />
              <h4>Рус</h4>
              <Image
                src='/film/subtitleIcon.png'
                width={15}
                height={15}
                alt='суб рус'
              />
              <h4>Рус</h4>
            </div>

            <div className={style.conteiner_info_persons}>
              <div className={style.conteiner_info_persons_img}>
                <div className={style.iviRaiting}>
                  <h4>8,9</h4>
                </div>
                <h5>Рейтинг Иви</h5>
              </div>
              {film.artists.map((actor, index) => (
                <div
                  key={actor.id}
                  className={style.conteiner_info_persons_img}
                >
                  <Image
                    src='/film/noPhotoIcon44x44.png'
                    width={44}
                    height={44}
                    alt='актер'
                  />
                  <h5>{actor.name}</h5>
                </div>
              ))}
            </div>

            <div className={style.conteiner_info_details}>
              <ExpandBlock
                visibleBlock={film.description}
                width={'450px'}
                lineClamp={5}
                expandWord={'Детали о фильме'}
              >
                <WatchBlock />
              </ExpandBlock>
            </div>

            <div className={style.conteiner_info_rating}>
              <IviRaiting />
            </div>
          </div>
        </div>
        <TopTenList />

        <div className={style.actors_wrapper}>
          <h1>Актеры и создатели</h1>
          <WatchActors film={film} mainImg={mainImg} />
        </div>

        <div className={style.wrapper_reviews}>
          <div className={style.reviews_info}>
            <div className={style.reviews_info_title}>
              Отзывы
              <span className={style.reviews_info_quantity}>383</span>
              <p>
                <div className={style.reviews_info_subtitle}>
                  о фильме &#171;{film.name}&#187;
                </div>
              </p>
            </div>
            <button className={style.reviews_info_button}>
              <span className={style.reviews_info_button_text}>
                Оставить отзыв
              </span>
            </button>
          </div>

          <div>{/*здесь компонет с коментами*/}</div>
        </div>
        <div className={style.footer_wrapper}>
          <WatchFooter film={film} mainImg={mainImg} />
        </div>
      </section>
    </PageLayout>
  )
}

export default Film
