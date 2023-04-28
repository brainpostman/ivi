import style from './WatchActors.module.scss'
import React from 'react'
import {Actors} from './Actors'
interface Actors{
    id:number,
    img:string,
    name:string,
    title:string
}

const WatchActors: React.FC = () =>{
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
                <button className={style.button}>
                    <div className={style.button_text}>Ещё</div>
                </button>
            </div>
        </div>
    )
}

export default WatchActors;