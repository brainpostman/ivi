import { IMovie } from '@/types/ICrudMovie';
import styles from './AdminMovie.module.scss';
import Image from 'next/image';

interface IAdminMovieProps {
    movie: IMovie;
}

const AdminMovie = ({ movie }: IAdminMovieProps) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.image__wrapper}>
                <Image
                    src={`http:${movie.mainImg}` ?? ''}
                    alt='Poster'
                    fill
                    className={styles.image}
                />
                <p>
                    <span></span>
                </p>
            </div>
            <div className={styles.info}>
                <div className={`${styles.info__row} ${styles.info__row_1}`}>
                    <p>
                        Название: <span>{movie.name}</span>
                    </p>
                    <p>
                        На английском: <span>{movie.name_en}</span>
                    </p>
                    <p>
                        Год: <span>{movie.year}</span>
                    </p>
                </div>
                <div className={`${styles.info__row} ${styles.info__row_2}`}>
                    <p>
                        Тип: <span></span>
                    </p>
                    <p>
                        <span></span>
                    </p>
                    <p>
                        <span></span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminMovie;
