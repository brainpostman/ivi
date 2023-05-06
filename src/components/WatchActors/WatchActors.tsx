import style from './WatchActors.module.scss'
import React,{useState} from 'react'
import {Actors} from './Actors'
import WatchModal from '../WatchModal/WatchModal'
import { MdArrowBackIosNew } from 'react-icons/md'
import Image from 'next/image';
import film,{ FilmID, getServerSideProps,getFilm } from '@/pages/watch/[id]'

const WatchActors: React.FC<FilmID>= ({film,mainImg}) =>{
    const [modalActive,setModalActive]=useState(false);

    return(
        <div className={style.conteiner}>
            <div className={style.content}>
                {film.actors.map((actor,index)=>
                    <div key={actor.id} className={style.content_person}>
                        <div className={style.content_person_img}><Image src='/film/noPhotoIcon60x60.png' width={88} height={88} alt={actor.name}/></div>
                        <div className={style.content_person_name}>{actor.name}</div>
                        <div className={style.content_person_title}>актер</div>
                    </div>
                )}
                <button className={style.button} onClick={()=>setModalActive(true)}>
                    <div className={style.button_text}>Ещё</div>
                </button>
            </div>
            <WatchModal active={modalActive} setActive={setModalActive}>
                <div className={style.wrapper} onClick={e=>e.stopPropagation()}>
                    <div className={style.back_button} onClick={()=>setModalActive(false)}>
                        <MdArrowBackIosNew />
                        <p>К фильму</p>
                    </div>
                    
                    <div className={style.modal_conteiner}>
                        <div className={style.modal_info}>
                            <div className={style.modal_info_title}>{film.name}: актеры и создатели фильма</div>
                            <h3 className={style.modal_info_subtitle}>Режиссёры</h3>
                            <ul className={style.persons_conteiner}>
                            {film.directors.map((director,index)=>
                                <li key={director.id} className={style.modal_person}>
                                    <div className={style.modal_person_img}><Image src='/film/noPhotoIcon60x60.png' width={128} height={128} alt={director.name}/></div>
                                    <div className={style.modal_person_name}>{director.name}</div>
                                </li>
                            )}
                            </ul>

                            <h3 className={style.modal_info_subtitle}>Актёры</h3>
                            <ul className={style.persons_conteiner}>
                            {film.actors.map((actor,index)=>
                                <li key={actor.id} className={style.modal_person}>
                                    <div className={style.modal_person_img}><Image src='/film/noPhotoIcon60x60.png' width={128} height={128} alt={actor.name}/></div>
                                    <div className={style.modal_person_name}>{actor.name}</div>
                                </li>
                            )}
                            </ul>

                            <h3 className={style.modal_info_subtitle}>Операторы</h3>
                            <ul className={style.persons_conteiner}>
                            {film.operators.map((operator,index)=>
                                <li key={operator.id} className={style.modal_person}>
                                    <div className={style.modal_person_img}><Image src='/film/noPhotoIcon60x60.png' width={128} height={128} alt={operator.name}/></div>
                                    <div className={style.modal_person_name}>{operator.name}</div>
                                </li>
                            )}
                            </ul>

                            <h3 className={style.modal_info_subtitle}>Художники</h3>
                            <ul className={style.persons_conteiner}>
                            {film.artists.map((artist,index)=>
                                <li key={artist.id} className={style.modal_person}>
                                    <div className={style.modal_person_img}><Image src='/film/noPhotoIcon60x60.png' width={128} height={128} alt={artist.name}/></div>
                                    <div className={style.modal_person_name}>{artist.name}</div>
                                </li>
                            )}
                            </ul>

                            <h3 className={style.modal_info_subtitle}>Сценаристы</h3>
                            <ul className={style.persons_conteiner}>
                            {film.scenario.map((scenarist,index)=>
                                <li key={scenarist.id} className={style.modal_person}>
                                    <div className={style.modal_person_img}><Image src='/film/noPhotoIcon60x60.png' width={128} height={128} alt={scenarist.name}/></div>
                                    <div className={style.modal_person_name}>{scenarist.name}</div>
                                </li>
                            )}
                            </ul>

                            <h3 className={style.modal_info_subtitle}>Композиторы</h3>
                            <ul className={style.persons_conteiner}>
                            {film.compositors.map((compositor,index)=>
                                <li key={compositor.id} className={style.modal_person}>
                                    <div className={style.modal_person_img}><Image src='/film/noPhotoIcon60x60.png' width={128} height={128} alt={compositor.name}/></div>
                                    <div className={style.modal_person_name}>{compositor.name}</div>
                                </li>
                            )}
                            </ul>

                            <h3 className={style.modal_info_subtitle}>Монтаж</h3>
                            <ul className={style.persons_conteiner}>
                            {film.montages.map((montage,index)=>
                                <li key={montage.id} className={style.modal_person}>
                                    <div className={style.modal_person_img}><Image src='/film/noPhotoIcon60x60.png' width={128} height={128} alt={montage.name}/></div>
                                    <div className={style.modal_person_name}>{montage.name}</div>
                                </li>
                            )}
                            </ul>
                        </div>

                        <div className={style.modal_poster}>
                            <div className={style.modal_poster_img}><Image src={mainImg}width={128} height={196} alt='постер'/></div>
                            <div className={style.modal_poster_rating}>8,9</div>
                            <div className={style.modal_poster_genres}>{film.year}, {film.countries.map(country=>country.name).join(', ')} {film.genres.map(genre=>genre.name).join(', ')}</div>
                            <div className={style.modal_poster_duratin}><Image src='/film/clockIcon.png' width={16} height={16} alt='иконка'/>{film.time}</div>
                        </div>
                    </div>
                </div>
            </WatchModal>
        </div>
    )
}

export default WatchActors;