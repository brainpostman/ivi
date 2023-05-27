import {
    CRUDDetailedFilmRequest,
    ICRUDDetailedFilm,
    ICRUDDetailedFilmRequest,
} from '@/types/api/ICrudMovie';
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
import { useTranslation } from 'next-i18next';

interface IAdminDetailedMovieProps {
    movie: ICRUDDetailedFilm;
    className?: string;
}

const AdminDetailedMovie = ({ movie, className: propsClassName }: IAdminDetailedMovieProps) => {
    const { t } = useTranslation('admin', { keyPrefix: 'admin-movie' });
    const createdAt = new Date(movie.createdAt);
    const updatedAt = new Date(movie.updatedAt);
    const { data } = useSession();
    const router = useRouter();
    const [name, setName] = useState(movie.name || '-');
    const [engName, setEngName] = useState(movie.name_en || '-');

    const handleFieldChanges = async () => {
        if (name !== movie.name || engName !== movie.name_en) {
            const newMovie: ICRUDDetailedFilmRequest = {
                ...new CRUDDetailedFilmRequest(movie),
                name: name,
                name_en: engName,
            };
            try {
                const response = await customAxios.put('/film-update', newMovie, {
                    headers: {
                        Authorization: `Bearer ${data?.accessToken ?? ''}`,
                    },
                });
                toast.info(`${response.status}: ${response.statusText}`);
                router.replace(router.asPath);
            } catch (error: any) {
                console.log(error);
                toast.error(error.message);
            }
        } else {
            toast.info(t('no-changes'));
        }
    };

    return (
        <fieldset className={`${parentStyles.wrapper} ${propsClassName} ${styles.wrapper}`}>
            <legend className={parentStyles.legend}>
                <span>
                    ID: <span className={parentStyles.info__item__value}>{movie.id}</span>
                </span>
                <span>
                    {t('created-at')}:{' '}
                    <span className={parentStyles.info__item__value}>
                        {`${createdAt?.toLocaleDateString()}, ${createdAt?.toLocaleTimeString()}`}
                    </span>
                </span>
                <span>
                    {t('updated-at')}:{' '}
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
                        <label className={styles.input__title}>{t('title')}:</label>
                        <input
                            className={styles.input}
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            type='text'
                        />
                    </p>
                    <p className={`${parentStyles.info__item} ${styles.input__item}`}>
                        <label className={styles.input__title}>{t('title-eng')}:</label>
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
                        title={t('save-changes')}
                    />
                    <GiCancel
                        className={`${styles.icon} ${styles.cancel}`}
                        onClick={() => {
                            setName(movie.name);
                            setEngName(movie.name_en);
                        }}
                        title={t('undo-changes')}
                    />
                </div>
                <div className={`${parentStyles.info__row} ${parentStyles.info__row_2}`}>
                    <p className={parentStyles.info__item}>
                        {t('year')}:{' '}
                        <span className={parentStyles.info__item__value}>{movie.year || '-'}</span>
                    </p>
                    <p className={parentStyles.info__item}>
                        {t('type')}:{' '}
                        <span className={parentStyles.info__item__value}>{movie.type || '-'}</span>
                    </p>
                    <p className={parentStyles.info__item}>
                        {t('countries')}:{' '}
                        <span className={parentStyles.info__item__value}>
                            {movie.countries
                                .map((country) => {
                                    return country.name;
                                })
                                .join(', ') || '-'}
                        </span>
                    </p>
                    <p className={parentStyles.info__item}>
                        {t('genres')}:{' '}
                        <span className={parentStyles.info__item__value}>
                            {movie.genres
                                .map((genre) => {
                                    return router.locale === 'ru' ? genre.name : genre.name_en;
                                })
                                .filter((str) => {
                                    return str;
                                })
                                .join(', ') || '-'}
                        </span>
                    </p>
                </div>
                <div className={`${parentStyles.info__row} ${parentStyles.info__row_3}`}>
                    <p className={parentStyles.info__item}>
                        {t('score')}:{' '}
                        <span className={parentStyles.info__item__value}>
                            {movie.scoreAVG ? movie.scoreAVG.toFixed(2) : '-'}
                        </span>
                    </p>
                    <p className={parentStyles.info__item}>
                        {t('score-count')}:{' '}
                        <span className={parentStyles.info__item__value}>
                            {movie.countScore || '-'}
                        </span>
                    </p>
                    <p className={parentStyles.info__item}>
                        {t('budget')}:{' '}
                        <span className={parentStyles.info__item__value}>
                            {escapeHtmlNbsp(movie.budget || '-')}
                        </span>
                    </p>
                    <p className={parentStyles.info__item}>
                        {t('premiere')}:{' '}
                        <span className={parentStyles.info__item__value}>
                            {movie.premiere || '-'}
                        </span>
                    </p>
                    <p className={parentStyles.info__item}>
                        {t('premiere-ru')}:{' '}
                        <span className={parentStyles.info__item__value}>
                            {movie.premiereRU || '-'}
                        </span>
                    </p>
                </div>
                <div className={`${parentStyles.info__row} ${parentStyles.info__row_4}`}>
                    <p className={parentStyles.info__item}>
                        {t('fees-ru')}:{' '}
                        <span className={parentStyles.info__item__value}>
                            {escapeHtmlNbsp(movie.feesRU || '-')}
                        </span>
                    </p>
                    <p className={parentStyles.info__item}>
                        {t('fees-usa')}:{' '}
                        <span className={parentStyles.info__item__value}>
                            {escapeHtmlNbsp(movie.feesUS || '-')}
                        </span>
                    </p>
                    <p className={parentStyles.info__item}>
                        {t('fees-world')}:{' '}
                        <span className={parentStyles.info__item__value}>
                            {escapeHtmlNbsp(movie.fees || '-')}
                        </span>
                    </p>
                </div>

                <div className={`${parentStyles.info__row} ${parentStyles.info__row_5}`}>
                    <p className={parentStyles.info__item}>
                        {t('age')}:{' '}
                        <span className={parentStyles.info__item__value}>{movie.age || '-'}</span>
                    </p>
                    <p className={parentStyles.info__item}>
                        {t('mpaa')}:{' '}
                        <span className={parentStyles.info__item__value}>
                            {movie.ratingMPAA || '-'}
                        </span>
                    </p>
                    <p className={parentStyles.info__item}>
                        {t('runtime')}:{' '}
                        <span className={parentStyles.info__item__value}>{movie.time || '-'}</span>
                    </p>
                </div>
                <div className={`${parentStyles.info__row} ${parentStyles.info__row_6}`}>
                    <p className={parentStyles.info__item}>
                        {t('tagline')}:{' '}
                        <span className={parentStyles.info__item__value}>
                            {movie.tagline || '-'}
                        </span>
                    </p>
                </div>
                <div className={`${parentStyles.info__row} ${parentStyles.info__row_7}`}>
                    <p className={parentStyles.info__item}>
                        {t('actors')}:{' '}
                        <span className={parentStyles.info__item__value}>
                            {movie.actors
                                .map((actor) => {
                                    return actor.name;
                                })
                                .join(', ') || '-'}
                        </span>
                    </p>
                </div>
                <div className={`${parentStyles.info__row} ${parentStyles.info__row_8}`}>
                    <p className={parentStyles.info__item}>
                        {t('directors')}:{' '}
                        <span className={parentStyles.info__item__value}>
                            {movie.directors
                                .map((director) => {
                                    return director.name;
                                })
                                .join(', ') || '-'}
                        </span>
                    </p>
                </div>

                <div className={`${parentStyles.info__row} ${parentStyles.info__row_9}`}>
                    <p className={parentStyles.info__item}>
                        {t('description')}:{' '}
                        <span className={parentStyles.info__item__value}>
                            {movie.description || '-'}
                        </span>
                    </p>
                </div>
                <div className={`${parentStyles.info__row} ${parentStyles.info__row_10}`}>
                    <p className={parentStyles.info__item}>
                        {t('writers')}:{' '}
                        <span className={parentStyles.info__item__value}>
                            {movie.scenario
                                .map((writer) => {
                                    return writer.name;
                                })
                                .join(', ') || '-'}
                        </span>
                    </p>
                </div>
                <div className={`${parentStyles.info__row} ${parentStyles.info__row_11}`}>
                    <p className={parentStyles.info__item}>
                        {t('editors')}:{' '}
                        <span className={parentStyles.info__item__value}>
                            {movie.montages
                                .map((editor) => {
                                    return editor.name;
                                })
                                .join(', ') || '-'}
                        </span>
                    </p>
                </div>
                <div className={`${parentStyles.info__row} ${parentStyles.info__row_12}`}>
                    <p className={parentStyles.info__item}>
                        {t('artists')}:{' '}
                        <span className={parentStyles.info__item__value}>
                            {movie.artists
                                .map((artist) => {
                                    return artist.name;
                                })
                                .join(', ') || '-'}
                        </span>
                    </p>
                </div>
                <div className={`${parentStyles.info__row} ${parentStyles.info__row_13}`}>
                    <p className={parentStyles.info__item}>
                        {t('operators')}:{' '}
                        <span className={parentStyles.info__item__value}>
                            {movie.operators
                                .map((operator) => {
                                    return operator.name;
                                })
                                .join(', ') || '-'}
                        </span>
                    </p>
                </div>
                <div className={`${parentStyles.info__row} ${parentStyles.info__row_14}`}>
                    <p className={parentStyles.info__item}>
                        {t('composers')}:{' '}
                        <span className={parentStyles.info__item__value}>
                            {movie.compositors
                                .map((composer) => {
                                    return composer.name;
                                })
                                .join(', ') || '-'}
                        </span>
                    </p>
                </div>
                <div className={`${parentStyles.info__row} ${parentStyles.info__row_15}`}>
                    <p className={parentStyles.info__item}>
                        {t('spectators')}:
                        <span className={parentStyles.info__item__value}>
                            {movie.spectators
                                .map((item) => {
                                    return `${item.country}: ${item.count}`;
                                })
                                .join(', ') || '-'}
                        </span>
                    </p>
                    <p className={parentStyles.info__item}>
                        {t('release-dvd')}:{' '}
                        <span className={parentStyles.info__item__value}>
                            {movie.releaseDVD || '-'}
                        </span>
                    </p>
                    <p className={parentStyles.info__item}>
                        {t('release-bluray')}:{' '}
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
