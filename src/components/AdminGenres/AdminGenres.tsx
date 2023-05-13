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
            <thead className={styles.header}>
                <tr>
                    <th className={styles.cell}>ID</th>
                    <th className={styles.cell}>Название</th>
                    <th className={styles.cell}>Название (eng)</th>
                    <th className={styles.cell}>Запись создана</th>
                    <th className={styles.cell}>Последнее обновление</th>
                </tr>
            </thead>
            <tbody className={styles.body}>
                {genres.map((genre) => {
                    return <AdminGenre key={genre.id} genre={genre} setLoading={setLoading} />;
                })}
            </tbody>
        </table>
    );
};

export default AdminGenres;
