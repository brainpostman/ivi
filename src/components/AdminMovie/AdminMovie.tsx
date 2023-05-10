import {
    CrudDetailedFilm,
    ICrudDetailedFilm,
    ICrudFilm,
    IDetailedFilmJson,
} from '@/types/ICrudMovie';
import ExpandBlock from '../ExpandBlock/ExpandBlock';
import Image from 'next/image';
import { escapeHtmlNbsp } from '@/utils/escapeHtml';
import styles from './AdminMovie.module.scss';
import ModalWindow from '../ModalWindow/ModalWindow';
import { useState } from 'react';
import { customAxios } from '@/api/queries/customAxios';
import { toast } from 'react-toastify';
import AdminDetailedMovie from './AdminDetailedMovie/AdminDetailedMovie';
import Loader from '../Loader/Loader';
import { useRouter } from 'next/router';

interface IAdminMovieProps {
    movie: ICrudFilm;
    className?: string;
}

const AdminMovie = ({ movie, className: propsClassName }: IAdminMovieProps) => {
    const createdAt = new Date(movie.createdAt);
    const updatedAt = new Date(movie.updatedAt);

    const { locale } = useRouter();
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [detailedMovie, setDetailedMovie] = useState<ICrudDetailedFilm | null>(null);

    const handleShowDetails = async () => {
        setIsLoading(true);
        try {
            const response = await customAxios.get<IDetailedFilmJson>(`/films/${movie.id}`);
            const film = new CrudDetailedFilm(response.data);
            setIsLoading(false);
            setDetailedMovie(film);
            setShowModal(true);
        } catch (error: any) {
            setIsLoading(false);
            toast.error(error);
        }
    };

    return (
        <fieldset className={`${styles.wrapper} ${propsClassName}`}>
            <legend className={styles.legend}>
                <span>
                    ID: <span className={styles.info__item__value}>{movie.id}</span>
                </span>
                <span>
                    Запись создана:{' '}
                    <span className={styles.info__item__value}>
                        {`${createdAt?.toLocaleDateString()}, ${createdAt?.toLocaleTimeString()}`}
                    </span>
                </span>
                <span>
                    Последнее обновление:{' '}
                    <span className={styles.info__item__value}>
                        {`${updatedAt?.toLocaleDateString()}, ${updatedAt?.toLocaleTimeString()}`}
                    </span>
                </span>
            </legend>
            <div className={styles.left}>
                <div className={styles.image__wrapper}>
                    <Image
                        src={`http:${movie.mainImg}` || ''}
                        alt='Poster'
                        height={100}
                        width={130}
                        className={styles.image}
                    />
                </div>
                {isLoading ? (
                    <Loader />
                ) : (
                    <div
                        className={styles.details}
                        onClick={() => {
                            handleShowDetails();
                        }}>
                        Подробнее
                    </div>
                )}
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
                        Страны:{' '}
                        <span className={styles.info__item__value}>
                            {movie.countries.join(', ') || '-'}
                        </span>
                    </p>
                    <p className={styles.info__item}>
                        Жанры:{' '}
                        <span className={styles.info__item__value}>
                            {(locale === 'ru' ? movie.genres : movie.genres_en)
                                .filter((genre) => {
                                    return genre;
                                })
                                .join(', ') || '-'}
                        </span>
                    </p>
                </div>
                <div className={`${styles.info__row} ${styles.info__row_3}`}>
                    <p className={styles.info__item}>
                        Оценка:{' '}
                        <span className={styles.info__item__value}>{movie.scoreAVG || '-'}</span>
                    </p>
                    <p className={styles.info__item}>
                        Бюджет:{' '}
                        <span className={styles.info__item__value}>
                            {escapeHtmlNbsp(movie.budget || '-')}
                        </span>
                    </p>
                    <p className={styles.info__item}>
                        Премьера:{' '}
                        <span className={styles.info__item__value}>{movie.premiere || '-'}</span>
                    </p>
                    <p className={styles.info__item}>
                        Премьера в России:{' '}
                        <span className={styles.info__item__value}>{movie.premiereRU || '-'}</span>
                    </p>
                </div>
                <div className={`${styles.info__row} ${styles.info__row_4}`}>
                    <p className={styles.info__item}>
                        Сборы в России:{' '}
                        <span className={styles.info__item__value}>
                            {escapeHtmlNbsp(movie.feesRU || '-')}
                        </span>
                    </p>
                    <p className={styles.info__item}>
                        Сборы в США:{' '}
                        <span className={styles.info__item__value}>
                            {escapeHtmlNbsp(movie.feesUS || '-')}
                        </span>
                    </p>
                    <p className={styles.info__item}>
                        Сборы:{' '}
                        <span className={styles.info__item__value}>
                            {escapeHtmlNbsp(movie.fees || '-')}
                        </span>
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
                        Слоган:{' '}
                        <span className={styles.info__item__value}>{movie.tagline || '-'}</span>
                    </p>
                </div>

                <div className={`${styles.info__row} ${styles.info__row_7}`}>
                    <p className={styles.info__item}>
                        Описание:{' '}
                        <span className={styles.info__item__value}>{movie.description || '-'}</span>
                    </p>
                </div>
                <div className={`${styles.info__row} ${styles.info__row_8}`}>
                    <p className={styles.info__item}>
                        Выход на DVD:{' '}
                        <span className={styles.info__item__value}>{movie.releaseDVD || '-'}</span>
                    </p>
                    <p className={styles.info__item}>
                        Выход на BluRay:{' '}
                        <span className={styles.info__item__value}>
                            {movie.releaseBluRay || '-'}
                        </span>
                    </p>
                </div>
            </div>
            <ModalWindow
                isShow={showModal}
                closeFunc={() => {
                    setShowModal(false);
                }}>
                {detailedMovie && (
                    <AdminDetailedMovie movie={detailedMovie} className={styles.detailedmodal} />
                )}
            </ModalWindow>
        </fieldset>
    );
};

export default AdminMovie;
