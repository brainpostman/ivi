import ExpandInfo from '@/components/ExpandInfo/ExpandInfo'
import BasicBtn from '@/components/UI/BasicBtn/BasicBtn'
import {
  acortTopInfoVisibleData,
  actorBiografyData,
  actorBiografyInfoVisibleData,
  actorFilmsData,
} from '@/data/person.data'
import PageLayout from '@/layouts/PageLayout'
import Image from 'next/image'
import Link from 'next/link'
import { MdArrowBackIosNew } from 'react-icons/md'
import style from './actors.module.scss'

export default function Actor() {
  return (
    <PageLayout title='Актёр'>
      <section className={style.wrapper}>
        <div className={style.back_button}>
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
              <ExpandInfo visibleText={acortTopInfoVisibleData} width='100%'>
                Коэн «Внутри Льюина Дэвиса».
              </ExpandInfo>
              <div className={style.info_buttons}>
                <Link href='#films'>47 фильмов</Link>
                <Link href='#biografy'>Биография</Link>
              </div>
            </div>
          </div>

          <div className={style.films_wrapper}>
            <div className={style.films_header}>
              <p className={style.films_header__title} id='films'>
                Полная фильмография
              </p>
              <p className={style.films_header__subtitle}>47 фильмов</p>
            </div>

            {/*FILM LIST*/}
            <ul className={style.films_list}>
              {actorFilmsData.slice(0, 7).map(film => (
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
            <p className={style.more_films}>Eще 39 фильмов</p>
          </div>
          <div className={style.biografy} id='biografy'>
            <h2>Биография</h2>
            <ExpandInfo visibleText={actorBiografyInfoVisibleData} width='100%'>
              {actorBiografyData}
            </ExpandInfo>
          </div>
        </article>
      </section>
    </PageLayout>
  )
}
