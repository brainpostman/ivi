import { ICrudGenre } from '@/types/ICrudMovie';
import styles from './AdminGenres.module.scss';
import AdminGenre from './AdminGenre/AdminGenre';
import { Dispatch, SetStateAction } from 'react';

interface IAdminGenres {
    genres: ICrudGenre[];
    setLoading: Dispatch<SetStateAction<boolean>>;
}

const AdminGenres = ({ genres, setLoading }: IAdminGenres) => {
    return (
        <table className={styles.table}>
            <th className={styles.header}>ID</th>
            <th className={styles.header}>Название</th>
            <th className={styles.header}>Название (eng)</th>
            <th className={styles.header}>Запись создана</th>
            <th className={styles.header}>Последнее обновление</th>
            <tbody className={styles.body}>
                {genres.map((genre) => {
                    return <AdminGenre key={genre.id} genre={genre} setLoading={setLoading} />;
                })}
            </tbody>
        </table>
    );
};

export default AdminGenres;
