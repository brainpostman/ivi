import style from './WatchActors.module.scss'
import React,{useState} from 'react'
import {Actors} from './Actors'
import WatchModal from '../WatchModal/WatchModal'
import { MdArrowBackIosNew } from 'react-icons/md'
interface Actors{
    id:number,
    img:string,
    name:string,
    title:string,
    films:number
}

const WatchActors: React.FC = () =>{
    const [modalActive,setModalActive]=useState(false);

    return(
        <div className={style.conteiner}>
            <div className={style.content}>
                {Actors.map((actor,index)=>
                    <div key={index} className={style.content_person}>
                        <div className={style.content_person_img}><img src={actor.img} width={88} height={88} alt={actor.name}/></div>
                        <div className={style.content_person_name}>{actor.name}</div>
                        <div className={style.content_person_title}>{actor.title}</div>
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
                            <div className={style.modal_info_title}>1+1: актеры и создатели фильма</div>
                            <h3 className={style.modal_info_subtitle}>Режиссёры</h3>

                            <ul className={style.persons_conteiner}>
                            {Actors.map((actor,index)=>
                                <li key={index} className={style.modal_person}>
                                    <div className={style.modal_person_img}><img src={actor.img} alt={actor.name}/></div>
                                    <div className={style.modal_person_name}>{actor.name}</div>
                                    <div className={style.content_person_films}>{actor.films>4? `${actor.films} фильмов`:`${actor.films} фильма`}</div>
                                </li>
                            )}
                            </ul>
                            <h3 className={style.modal_info_subtitle}>Актёры</h3>
                            <h3 className={style.modal_info_subtitle}>Продюссеры</h3>
                            <h3 className={style.modal_info_subtitle}>Операторы</h3>
                            <h3 className={style.modal_info_subtitle}>Художники</h3>
                            <h3 className={style.modal_info_subtitle}>Сценаристы</h3>
                            <h3 className={style.modal_info_subtitle}>Композиторы</h3>
                            <h3 className={style.modal_info_subtitle}>Монтаж</h3>
                            <h3 className={style.modal_info_subtitle}>Режиссёры дубляжа</h3>
                            <h3 className={style.modal_info_subtitle}>Переводчик</h3>
                        </div>

                        <div className={style.modal_poster}>
                            <div className={style.modal_poster_img}><img src='https://thumbs.dfs.ivi.ru/storage2/contents/6/1/0ceca03c51c3d38f34bdf3fd0dd2c8.jpg/128x196/?q=60'/></div>
                            <div className={style.modal_poster_rating}>8,9</div>
                            <div className={style.modal_poster_genres}>2011, Франция, Драммы</div>
                            <div className={style.modal_poster_duratin}><img src='/film/clockIcon.png'/>112 минут</div>
                        </div>
                    </div>
                </div>
            </WatchModal>
        </div>
    )
}

export default WatchActors;