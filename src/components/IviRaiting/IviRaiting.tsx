import { IMovieById } from '@/types/films.api.interface';
import SimpleButton from '../UI/SimpleButton/SimpleButton';
import style from './IviRaiting.module.scss';

interface IIviRatingProps {
    film: IMovieById;
}

const IviRaiting = ({ film }: IIviRatingProps) => {
    return (
        <div className={style.wrapper}>
            <div className={style.wrapper_rating}>
                <div className={style.raiting}>
                    {film.scoreAVG ? film.scoreAVG.toFixed(2) : '-'}
                </div>
                <div className={style.raiting_info}>
                    <h1 className={style.raiting_info__title}>Рейтинг Иви</h1>
                    <h4 className={style.raiting_info__subtitle}>Интересный сюжет</h4>
                    <h4 className={style.raiting_info__subtitle}>Оценили: {film.countScore}</h4>
                </div>
            </div>

            <SimpleButton>Оценить</SimpleButton>
        </div>
    );
};

export default IviRaiting;
