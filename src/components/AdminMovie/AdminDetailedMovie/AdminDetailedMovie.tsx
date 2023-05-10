import { ICrudDetailedFilm } from '@/types/ICrudMovie';
import Image from 'next/image';
import { escapeHtmlNbsp } from '@/utils/escapeHtml';
import parentStyles from '../AdminMovie.module.scss';
import styles from './AdminDetailedMovie.module.scss';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { AiFillCheckCircle } from 'react-icons/ai';
import { GiCancel } from 'react-icons/gi';
import { toast } from 'react-toastify';
import { customAxios } from '@/api/queries/customAxios';
import { useRouter } from 'next/router';

interface IAdminDetailedMovieProps {
    movie: ICrudDetailedFilm;
    className?: string;
}

const AdminDetailedMovie = ({ movie, className: propsClassName }: IAdminDetailedMovieProps) => {
    const createdAt = new Date(movie.createdAt);
    const updatedAt = new Date(movie.updatedAt);
    const { data } = useSession();
    const router = useRouter();
    const [name, setName] = useState(movie.name || '-');
    const [engName, setEngName] = useState(movie.name_en || '-');

    const handleFieldChanges = async () => {
        if (name !== movie.name || engName !== movie.name_en) {
            const newMovie: ICrudDetailedFilm = { ...movie, name: name, name_en: engName };
            try {
                const response = await customAxios.put('/film-update', newMovie, {
                    headers: {
                        Authorization: `Bearer ${data?.accessToken ?? ''}`,
                    },
                });
                toast.info(`${response.status}: ${response.statusText}`);
                router.replace(router.asPath);
            } catch (error: any) {
                toast.error(error.message);
            }
        } else {
            toast.info('Нет изменений');
        }
    };

    return (
        <fieldset className={`${parentStyles.wrapper} ${propsClassName} ${styles.wrapper}`}>
            <legend className={parentStyles.legend}>
                <span>
                    ID: <span className={parentStyles.info__item__value}>{movie.id}</span>
                </span>
                <span>
                    Запись создана:{' '}
                    <span className={parentStyles.info__item__value}>
                        {`${createdAt?.toLocaleDateString()}, ${createdAt?.toLocaleTimeString()}`}
                    </span>
                </span>
                <span>
                    Последнее обновление:{' '}
                    <span className={parentStyles.info__item__value}>
                        {`${updatedAt?.toLocaleDateString()}, ${updatedAt?.toLocaleTimeString()}`}
                    </span>
                </span>
            </legend>
            <div className={parentStyles.left}>
                <div className={parentStyles.image__wrapper}>
                    <Image
                        src={`http:${movie.mainImg}` || ''}
                        alt='Poster'
                        height={100}
                        width={130}
                        className={parentStyles.image}
                    />
                </div>
            </div>
            <div className={parentStyles.info}>
                <div
                    className={`${parentStyles.info__row} ${parentStyles.info__row_1} ${styles.input__wrapper}`}>
                    <p className={`${parentStyles.info__item} ${styles.input__item}`}>
                        <label className={styles.input__title}>Название:</label>
                        <input
                            className={styles.input}
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            type='text'
                        />
                    </p>
                    <p className={`${parentStyles.info__item} ${styles.input__item}`}>
                        <label className={styles.input__title}>Название (eng):</label>
                        <input
                            className={styles.input}
                            value={engName}
                            onChange={(event) => setEngName(event.target.value)}
                            type='text'
                        />
                    </p>
                    <AiFillCheckCircle
                        className={`${styles.icon} ${styles.check}`}
                        onClick={() => handleFieldChanges()}
                        title='Сохранить изменения'
                    />
                    <GiCancel
                        className={`${styles.icon} ${styles.cancel}`}
                        onClick={() => {
                            setName(movie.name);
                            setEngName(movie.name_en);
                        }}
                        title='Отменить изменения'
                    />
                </div>
                <div className={`${parentStyles.info__row} ${parentStyles.info__row_2}`}>
                    <p className={parentStyles.info__item}>
                        Год:{' '}
                        <span className={parentStyles.info__item__value}>{movie.year || '-'}</span>
                    </p>
                    <p className={parentStyles.info__item}>
                        Тип:{' '}
                        <span className={parentStyles.info__item__value}>{movie.type || '-'}</span>
                    </p>
                    <p className={parentStyles.info__item}>
                        Страны:{' '}
                        <span className={parentStyles.info__item__value}>
                            {movie.countries.join(', ') || '-'}
                        </span>
                    </p>
                    <p className={parentStyles.info__item}>
                        Жанры:{' '}
                        <span className={parentStyles.info__item__value}>
                            {movie.genres.join(', ') || '-'}
                        </span>
                    </p>
                </div>
                <div className={`${parentStyles.info__row} ${parentStyles.info__row_3}`}>
                    <p className={parentStyles.info__item}>
                        Оценка:{' '}
                        <span className={parentStyles.info__item__value}>
                            {movie.scoreAVG || '-'}
                        </span>
                    </p>
                    <p className={parentStyles.info__item}>
                        Бюджет:{' '}
                        <span className={parentStyles.info__item__value}>
                            {escapeHtmlNbsp(movie.budget || '-')}
                        </span>
                    </p>
                    <p className={parentStyles.info__item}>
                        Премьера:{' '}
                        <span className={parentStyles.info__item__value}>
                            {movie.premiere || '-'}
                        </span>
                    </p>
                    <p className={parentStyles.info__item}>
                        Премьера в России:{' '}
                        <span className={parentStyles.info__item__value}>
                            {movie.premiereRU || '-'}
                        </span>
                    </p>
                </div>
                <div className={`${parentStyles.info__row} ${parentStyles.info__row_4}`}>
                    <p className={parentStyles.info__item}>
                        Сборы в России:{' '}
                        <span className={parentStyles.info__item__value}>
                            {escapeHtmlNbsp(movie.feesRU || '-')}
                        </span>
                    </p>
                    <p className={parentStyles.info__item}>
                        Сборы в США:{' '}
                        <span className={parentStyles.info__item__value}>
                            {escapeHtmlNbsp(movie.feesUS || '-')}
                        </span>
                    </p>
                    <p className={parentStyles.info__item}>
                        Сборы:{' '}
                        <span className={parentStyles.info__item__value}>
                            {escapeHtmlNbsp(movie.fees || '-')}
                        </span>
                    </p>
                </div>

                <div className={`${parentStyles.info__row} ${parentStyles.info__row_5}`}>
                    <p className={parentStyles.info__item}>
                        Возрастное ограничение:{' '}
                        <span className={parentStyles.info__item__value}>{movie.age || '-'}</span>
                    </p>
                    <p className={parentStyles.info__item}>
                        Рейтинг MPAA:{' '}
                        <span className={parentStyles.info__item__value}>
                            {movie.ratingMPAA || '-'}
                        </span>
                    </p>
                    <p className={parentStyles.info__item}>
                        Время:{' '}
                        <span className={parentStyles.info__item__value}>{movie.time || '-'}</span>
                    </p>
                </div>
                <div className={`${parentStyles.info__row} ${parentStyles.info__row_6}`}>
                    <p className={parentStyles.info__item}>
                        Слоган:{' '}
                        <span className={parentStyles.info__item__value}>
                            {movie.tagline || '-'}
                        </span>
                    </p>
                </div>
                <div className={`${parentStyles.info__row} ${parentStyles.info__row_7}`}>
                    <p className={parentStyles.info__item}>
                        Актеры:{' '}
                        <span className={parentStyles.info__item__value}>
                            {movie.actors.join(', ') || '-'}
                        </span>
                    </p>
                </div>
                <div className={`${parentStyles.info__row} ${parentStyles.info__row_8}`}>
                    <p className={parentStyles.info__item}>
                        Режиссёры:{' '}
                        <span className={parentStyles.info__item__value}>
                            {movie.directors.join(', ') || '-'}
                        </span>
                    </p>
                </div>

                <div className={`${parentStyles.info__row} ${parentStyles.info__row_9}`}>
                    <p className={parentStyles.info__item}>
                        Описание:{' '}
                        <span className={parentStyles.info__item__value}>
                            {movie.description || '-'}
                        </span>
                    </p>
                </div>
                <div className={`${parentStyles.info__row} ${parentStyles.info__row_10}`}>
                    <p className={parentStyles.info__item}>
                        Сценаристы:{' '}
                        <span className={parentStyles.info__item__value}>
                            {movie.scenario.join(', ') || '-'}
                        </span>
                    </p>
                </div>
                <div className={`${parentStyles.info__row} ${parentStyles.info__row_11}`}>
                    <p className={parentStyles.info__item}>
                        Монтажёры:{' '}
                        <span className={parentStyles.info__item__value}>
                            {movie.montages.join(', ') || '-'}
                        </span>
                    </p>
                </div>
                <div className={`${parentStyles.info__row} ${parentStyles.info__row_12}`}>
                    <p className={parentStyles.info__item}>
                        Художники:{' '}
                        <span className={parentStyles.info__item__value}>
                            {movie.artists.join(', ') || '-'}
                        </span>
                    </p>
                </div>
                <div className={`${parentStyles.info__row} ${parentStyles.info__row_13}`}>
                    <p className={parentStyles.info__item}>
                        Операторы:{' '}
                        <span className={parentStyles.info__item__value}>
                            {movie.operators.join(', ') || '-'}
                        </span>
                    </p>
                </div>
                <div className={`${parentStyles.info__row} ${parentStyles.info__row_14}`}>
                    <p className={parentStyles.info__item}>
                        Композиторы:{' '}
                        <span className={parentStyles.info__item__value}>
                            {movie.compositors.join(', ') || '-'}
                        </span>
                    </p>
                </div>
                <div className={`${parentStyles.info__row} ${parentStyles.info__row_15}`}>
                    <p className={parentStyles.info__item}>
                        Зрители:
                        <span className={parentStyles.info__item__value}>
                            {movie.spectators
                                .map((item) => {
                                    return `${item.country}: ${item.count}`;
                                })
                                .join(', ') || '-'}
                        </span>
                    </p>
                    <p className={parentStyles.info__item}>
                        Выход на DVD:{' '}
                        <span className={parentStyles.info__item__value}>
                            {movie.releaseDVD || '-'}
                        </span>
                    </p>
                    <p className={parentStyles.info__item}>
                        Выход на BluRay:{' '}
                        <span className={parentStyles.info__item__value}>
                            {movie.releaseBluRay || '-'}
                        </span>
                    </p>
                </div>
            </div>
        </fieldset>
    );
};

export default AdminDetailedMovie;
