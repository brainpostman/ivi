import Image from 'next/image';
import style from './ModalFilmPoster.module.scss';
import { IMovieById } from '@/types/films.api.interface';

interface IFilmPosterProps {
    film: IMovieById;
}

const ModalFilmPoster = ({ film }: IFilmPosterProps) => {
    return (
        <div className={style.modal_poster}>
            <div className={style.modal_poster_img}>
                <Image src={film.mainImg} alt='постер' fill />
            </div>
            <div className={style.modal_poster_rating}>{film.scoreAVG?.toFixed(2)}</div>
            <div className={style.modal_poster_genres}>
                {film.year}, {film.countries}, {film.genres}
            </div>
            <div className={style.modal_poster_duratin}>
                <Image src='/film/clockIcon.png' width={16} height={16} alt='иконка' />
                {film.time}
            </div>
        </div>
    );
};

export default ModalFilmPoster;
