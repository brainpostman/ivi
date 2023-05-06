import { IMovie } from '@/types/ICrudMovie';
import styles from './AdminMovie.module.scss';
import Image from 'next/image';
import { escapeHtmlNbsp } from '@/utils/escapeHtml';
import ExpandBlock from '../ExpandBlock/ExpandBlock';

interface IAdminMovieProps {
    movie: IMovie;
}

const AdminMovie = ({ movie }: IAdminMovieProps) => {
    return (
        <fieldset className={styles.wrapper}>
            <legend className={styles.legend}>
                <span>
                    ID: <span className={styles.info__item__value}>{movie.id}</span>
                </span>
                <span>
                    Запись создана:{' '}
                    <span className={styles.info__item__value}>
                        {`${movie.createdAt?.toLocaleDateString()}, ${movie.createdAt?.toLocaleTimeString()}`}
                    </span>
                </span>
                <span>
                    Последнее обновление:{' '}
                    <span className={styles.info__item__value}>
                        {`${movie.updatedAt?.toLocaleDateString()}, ${movie.updatedAt?.toLocaleTimeString()}`}
                    </span>
                </span>
            </legend>
            <div className={styles.image__wrapper}>
                <Image
                    src={`http:${movie.mainImg}` || ''}
                    alt='Poster'
                    fill
                    className={styles.image}
                />
            </div>
            <div className={styles.info}>
                <div className={`${styles.info__row} ${styles.info__row_1}`}>
                    <p className={styles.info__item}>
                        Название:{' '}
                        <span className={styles.info__item__value}>{movie.name || '-'}</span>
                    </p>
                    <p className={styles.info__item}>
                        Название (eng):{' '}
                        <span className={styles.info__item__value}> {movie.name_en || '-'}</span>
                    </p>
                </div>
                <div className={`${styles.info__row} ${styles.info__row_2}`}>
                    <p className={styles.info__item}>
                        Год: <span className={styles.info__item__value}>{movie.year || '-'}</span>
                    </p>
                    <p className={styles.info__item}>
                        Тип: <span className={styles.info__item__value}>{movie.type || '-'}</span>
                    </p>
                    <p className={styles.info__item}>
                        Оценка:{' '}
                        <span className={styles.info__item__value}>{movie.scoreAVG || '-'}</span>
                    </p>
                    <p className={styles.info__item}>
                        Слоган:{' '}
                        <span className={styles.info__item__value}>{movie.tagline || '-'}</span>
                    </p>
                    <p className={styles.info__item}>
                        Бюджет:{' '}
                        <span className={styles.info__item__value}>
                            {escapeHtmlNbsp(movie.budget || '')}
                        </span>
                    </p>
                </div>
                <div className={`${styles.info__row} ${styles.info__row_3}`}>
                    <p className={styles.info__item}>
                        Сборы в России:{' '}
                        <span className={styles.info__item__value}>
                            {escapeHtmlNbsp(movie.feesRU || '')}
                        </span>
                    </p>
                    <p className={styles.info__item}>
                        Сборы в США:{' '}
                        <span className={styles.info__item__value}>
                            {escapeHtmlNbsp(movie.feesUS || '')}
                        </span>
                    </p>
                    <p className={styles.info__item}>
                        Сборы:{' '}
                        <span className={styles.info__item__value}>
                            {escapeHtmlNbsp(movie.fees || '')}
                        </span>
                    </p>
                </div>
                <div className={`${styles.info__row} ${styles.info__row_4}`}>
                    <p className={styles.info__item}>
                        Премьера:{' '}
                        <span className={styles.info__item__value}>{movie.premiere || '-'}</span>
                    </p>
                    <p className={styles.info__item}>
                        Премьера в России:{' '}
                        <span className={styles.info__item__value}>{movie.premiereRU || '-'}</span>
                    </p>
                </div>
                <div className={`${styles.info__row} ${styles.info__row_5}`}>
                    <p className={styles.info__item}>
                        Возрастное ограничение:{' '}
                        <span className={styles.info__item__value}>{movie.age || '-'}</span>
                    </p>
                    <p className={styles.info__item}>
                        Рейтинг MPAA:{' '}
                        <span className={styles.info__item__value}>{movie.ratingMPAA || '-'}</span>
                    </p>
                    <p className={styles.info__item}>
                        Время: <span className={styles.info__item__value}>{movie.time || '-'}</span>
                    </p>
                </div>
                <div className={`${styles.info__row} ${styles.info__row_6}`}>
                    <p className={styles.info__item}>
                        Страны:{' '}
                        <span className={styles.info__item__value}>
                            {movie.countries.map((item) => item.name).join(', ') || '-'}
                        </span>
                    </p>
                </div>
                <div className={`${styles.info__row} ${styles.info__row_7}`}>
                    <p className={styles.info__item}>
                        Жанры:{' '}
                        <span className={styles.info__item__value}>
                            {movie.genres.map((item) => item.name).join(', ') || '-'}
                        </span>
                    </p>
                </div>
                <div className={`${styles.info__row} ${styles.info__row_8}`}>
                    <p className={styles.info__item}>
                        Актеры:{' '}
                        <span className={styles.info__item__value}>
                            {movie.actors.map((item) => item.name).join(', ') || '-'}
                        </span>
                    </p>
                </div>
                <div className={`${styles.info__row} ${styles.info__row_9}`}>
                    <p className={styles.info__item}>
                        Режиссёры:{' '}
                        <span className={styles.info__item__value}>
                            {movie.directors.map((item) => item.name).join(', ') || '-'}
                        </span>
                    </p>
                </div>
                <ExpandBlock className={styles.info__expand} width='100%'>
                    <div className={`${styles.info__row} ${styles.info__row_10}`}>
                        <p className={styles.info__item}>
                            Описание:{' '}
                            <span className={styles.info__item__value}>
                                {movie.description || '-'}
                            </span>
                        </p>
                    </div>
                    <div className={`${styles.info__row} ${styles.info__row_11}`}>
                        <p className={styles.info__item}>
                            Сценаристы:{' '}
                            <span className={styles.info__item__value}>
                                {movie.scenario.map((item) => item.name).join(', ') || '-'}
                            </span>
                        </p>
                    </div>
                    <div className={`${styles.info__row} ${styles.info__row_12}`}>
                        <p className={styles.info__item}>
                            Монтажёры:{' '}
                            <span className={styles.info__item__value}>
                                {movie.montages.map((item) => item.name).join(', ') || '-'}
                            </span>
                        </p>
                    </div>
                    <div className={`${styles.info__row} ${styles.info__row_13}`}>
                        <p className={styles.info__item}>
                            Художники:{' '}
                            <span className={styles.info__item__value}>
                                {movie.artists.map((item) => item.name).join(', ') || '-'}
                            </span>
                        </p>
                    </div>
                    <div className={`${styles.info__row} ${styles.info__row_14}`}>
                        <p className={styles.info__item}>
                            Операторы:{' '}
                            <span className={styles.info__item__value}>
                                {movie.operators.map((item) => item.name).join(', ') || '-'}
                            </span>
                        </p>
                    </div>
                    <div className={`${styles.info__row} ${styles.info__row_15}`}>
                        <p className={styles.info__item}>
                            Композиторы:{' '}
                            <span className={styles.info__item__value}>
                                {movie.compositors.map((item) => item.name).join(', ') || '-'}
                            </span>
                        </p>
                    </div>
                    <div className={`${styles.info__row} ${styles.info__row_16}`}>
                        <p className={styles.info__item}>
                            Зрители:
                            <span className={styles.info__item__value}>
                                {movie.spectators
                                    .map((item) => {
                                        return `${item.country}: ${item.count}`;
                                    })
                                    .join(', ') || '-'}
                            </span>
                        </p>
                        <p className={styles.info__item}>
                            Выход на DVD:{' '}
                            <span className={styles.info__item__value}>{movie.releaseDVD || '-'}</span>
                        </p>
                        <p className={styles.info__item}>
                            Выход на BluRay:{' '}
                            <span className={styles.info__item__value}>{movie.releaseBluRay || '-'}</span>
                        </p>
                    </div>
                </ExpandBlock>
            </div>
        </fieldset>
    );
};

export default AdminMovie;
