import ExpandBlock from '@/components/ExpandBlock/ExpandBlock'
import TopTenList from '@/components/TopTenList/TopTenList'
import IviRaiting from '@/components/UI/IviRaiting/IviRaiting'
import WatchActors from '@/components/WatchActors/WatchActors'
import WatchBlock from '@/components/WatchBlock/WatchBlock'
import WatchFooter from '@/components/WatchFooter/WatchFooter'
import { filmDetails, filmDetailsVisible } from '@/data/watch.data'
import PageLayout from '@/layouts/PageLayout/PageLayout'
import React from 'react'
import { MdArrowBackIosNew } from 'react-icons/md'
import style from './watch.module.scss'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'ru', [
        'header',
        'auth_modal',
                'error',
        'common',
        'footer',
      ])),
      // Will be passed to the page component as props
    },
  }
}

export default function Film() {
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
              <img
                src='https://thumbs.dfs.ivi.ru/storage30/contents/c/c/e934645a5e1cc379ebd22e1a3bd3fa.jpg/858x483/?q=60'
                width={719}
              />
            </div>
            <div className={style.conteiner_film_buttons}>
              <button className={style.conteiner_film_buttons_play}>
                <img
                  src='/film/playIcon.png'
                  alt='играть'
                  width={16}
                  height={16}
                />{' '}
                Трейлер
              </button>
              <button className={style.conteiner_film_buttons_favourite}>
                <img
                  src='/film/favouritIcon.png'
                  alt='любимый'
                  width={16}
                  height={16}
                />
              </button>
              <button className={style.conteiner_film_buttons_share}>
                <img
                  src='/film/shareIcon.png'
                  alt='поделиться'
                  width={16}
                  height={16}
                />
              </button>
              <div className={style.conteiner_film_buttons_catalog}>
                <img
                  src='/film/catalogIcon.png'
                  alt='каталог'
                  width={16}
                  height={16}
                />{' '}
                Бесплатные фильмы
              </div>
            </div>
          </div>

          <div className={style.conteiner_info}>
            <h1 className={style.conteiner_info_title}> 1+1(Фильм 2011) </h1>
            <h4 className={style.conteiner_info_subtitle}>
              {' '}
              2011 1ч. 52мин. 16+{' '}
            </h4>

            <div className={style.conteiner_info_genres}>
              <h4>Франция</h4>
              <h4>Драмы</h4>
              <h4>Комедии</h4>
              <h4>Биография</h4>
            </div>

            <div className={style.conteiner_info_feature}>
              <div className={style.icon_fullhd}>
                <div className={style.icon_text}> FullHD </div>
              </div>
              <img
                src='/film/soundIcon.png'
                width={15}
                height={15}
                alt='звук рус'
              />
              <h4>Рус</h4>
              <img
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
              <div className={style.conteiner_info_persons_img}>
                <img
                  src='https://thumbs.dfs.ivi.ru/storage33/contents/f/f/06672be611ab9b9e54579c4f645460.jpg/44x44/?q=60'
                  width={44}
                  height={44}
                />
                <h5>Франсуа Клюзе</h5>
              </div>
              <div className={style.conteiner_info_persons_img}>
                <img
                  src='https://thumbs.dfs.ivi.ru/storage28/contents/5/4/5b9430c9601da3b2b00770fb7e08f0.jpeg/44x44/?q=60'
                  width={44}
                  height={44}
                />
                <h5>Омар Си</h5>
              </div>
              <div className={style.conteiner_info_persons_img}>
                <img
                  src='https://thumbs.dfs.ivi.ru/storage29/contents/4/6/15390a4eb071847bb4a5ea1b0aa6ac.jpg/44x44/?q=60'
                  width={44}
                  height={44}
                />
                <h5>Анн Ле Ни</h5>
              </div>
              <div className={style.conteiner_info_persons_img}>
                <img
                  src='https://thumbs.dfs.ivi.ru/storage8/contents/9/d/caa2b5168da75bbd8d8f1daab5a3ff.jpg/44x44/?q=60'
                  width={44}
                  height={44}
                />
                <h5>Одри Флеро</h5>
              </div>
            </div>

            <div className={style.conteiner_info_details}>
              <ExpandBlock visibleBlock={filmDetailsVisible} width='450'>
                {filmDetails}
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
          <WatchActors />
        </div>

        <div className={style.wrapper_reviews}>
          <div className={style.reviews_info}>
            <div className={style.reviews_info_title}>
              Отзывы
              <span className={style.reviews_info_quantity}>383</span>
              <h4 className={style.reviews_info_subtitle}>
                о фильме &#171;1+1&#187;
              </h4>
            </div>
            <button className={style.reviews_info_button}>
              <div className={style.reviews_info_button_text}>
                Оставить отзыв
              </div>
            </button>
          </div>

          <div>{/*здесь компонет с коментами*/}</div>
        </div>
        <div className={style.footer_wrapper}>
          <WatchFooter />
        </div>
      </section>
    </PageLayout>
  )
}
