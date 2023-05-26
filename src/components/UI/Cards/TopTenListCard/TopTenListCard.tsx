import { FC } from 'react';
import Image from 'next/image';
import style from './TopTenListCard.module.scss';
import { topTenListImgNumbers } from '@/data/topTenList.data';
import { IMovie } from '@/types/api/films.api.interface';

interface ITopTenListCardProps {
    film: IMovie;
    index: number;
}

const TopTenListCard: FC<ITopTenListCardProps> = ({ film, index }) => {
    return (
        <div className={style.wrapper}>
            <div className={style.wrapper_img}>
                <Image src={film.mainImg} alt='topTen' className={style.img} fill />
            </div>

            <Image
                src={topTenListImgNumbers[index]}
                alt='number'
                className={style.number}
                width={48}
                height={66}
            />

            <div className={style.shadow}></div>
        </div>
    );
};

export default TopTenListCard;
