import ExpandBlock from '@/components/ExpandBlock/ExpandBlock'
import BasicBtn from '@/components/UI/BasicBtn/BasicBtn'
import {
    acortTopInfoVisibleData,
    actorBiografyData,
    actorBiografyInfoVisibleData,
    actorFilmsData,
} from '@/data/person.data';
import PageLayout from '@/layouts/PageLayout/PageLayout';
import { getCoordY, scrollMove } from '@/utils/coords.utils';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { RefObject, useRef, useState } from 'react';
import { MdArrowBackIosNew } from 'react-icons/md';
import style from './actors.module.scss';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import {formatImgUrl} from '@/formatters/imgUrl.format'

export const getServerSideProps: GetServerSideProps = async ({ locale,params }) => {
  const actor = await getActor(params?.id)
  console.log(actor);

  const films=await getFilmsByActor(params?.id)
  console.log(films);
    return {
        props: {actor,films,
            ...(await serverSideTranslations(locale ?? 'ru', [
                'header',
                'auth_modal',
                'common',
                'footer',
            ])),
            // Will be passed to the page component as props
        },
    };
};


export const getActor = async (id: any) => {
  const response = await axios.get<ActorID[]>(
    `http://188.120.248.77:80/staffs/${id}`
  )
  return response.data
}
export const getFilmsByActor=async(id:any)=>{
  const response=await axios.get<ActorID>(`http://188.120.248.77/films`,{params:{actors:[Actor.name]}})
  return response.data
}
interface ActorID{
  actor:{
    id:number,
    name:string,
    biography:string,
    types:{id:number,name:string}[],
  }
  films:{
    id:number,
    name:string,
    name_en:string,
    mainImg:string,
    year:number,
    actors: {id:number;name:string}[],
  }[]
}
const Actor:React.FC<ActorID>=({actor,films})=> {
    const router = useRouter();
    const biografyRef = useRef<HTMLHeadingElement>(null);
    const filmographyRef = useRef<HTMLHeadingElement>(null);

  const [isExpand, setIsExpand] = useState(false)
  
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
                            src='/film/noPhotoIcon60x60.png'
                            alt='avatar'
                            width={120}
                            height={120}
                            className={style.img}
                        />
                        <div className={style.info_container}>
                            <h1 className={style.info_container__title}>{actor.name}</h1>
                            <h2 className={style.info_container__subtitle}>{actor.name}</h2>
                            <ExpandBlock visibleBlock={acortTopInfoVisibleData} width='100%'>
                                Коэн «Внутри Льюина Дэвиса».
                            </ExpandBlock>
                            <div className={style.info_buttons}>
                                <p onClick={scrollMove(getCoordY(filmographyRef))}>47 фильмов</p>
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
              {films.map((film)=>
                <li key={film.id}>
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
                        Рейтинг Иви: *8,9
                      </p>
                    </div>
                  </div>
                  <BasicBtn className={style.button}>Подробнее</BasicBtn>
                </li>)}
            </ul>
              <p className={style.more_films}>
                Eще 39 фильмов
            </p>
          </div>
          <div className={style.biografy}>
            <h2 ref={biografyRef}>Биография</h2>
            <ExpandBlock
              visibleBlock={actor.biography}
              width='100%'
              lineClamp={16}
              expandWord={'Читать дальше'}
            >
              {actorBiografyData}
            </ExpandBlock>
          </div>
        </article>
      </section>
    </PageLayout>
  )
}

export default Actor;