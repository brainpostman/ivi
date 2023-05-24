import Image from 'next/image';
import style from './FilmActors.module.scss';
import { IStaffGetResponse } from '@/types/staffs.interface';
import { FC } from 'react';
import Link from 'next/link';

interface IProps {
    actors: IStaffGetResponse[];
    className?: string;
    scoreAvg?: number | null;
}

const FilmActors: FC<IProps> = ({ actors, className, scoreAvg }) => {
    return (
        <div className={`${style.wrapper} ${className}`}>
            <div className={style.card}>
                <div className={style.wrapper_img}>
                    <div className={style.ivi_raiting}>
                        <h4>{scoreAvg ? scoreAvg.toFixed(2) : '-'}</h4>
                    </div>
                </div>
                <p className={style.name}>Рейтинг Иви</p>
            </div>
            {actors.map((actor) => (
                <Link key={actor.id} href={`/person/${actor.id}`}>
                    <div key={actor.id} className={style.card}>
                        <div className={style.wrapper_img}>
                            <Image
                                src='/film/noPhotoIcon44x44.png'
                                width={44}
                                height={44}
                                alt='актер'
                                className={style.img}
                            />
                        </div>
                        <p className={style.name}>{actor.name}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default FilmActors;
