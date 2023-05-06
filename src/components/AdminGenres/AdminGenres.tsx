import { IMovieGenre } from '@/types/ICrudMovie';
import styles from './AdminGenre.module.scss';

interface IAdminGenres {
    genres: IMovieGenre[];
}

const AdminGenres = ({ genres }: IAdminGenres) => {
    return (
        <table className={styles.table}>
            <thead className={styles.head}>
                <th className={styles.header}>ID</th>
                <th className={styles.header}>Название</th>
                <th className={styles.header}>Название (eng)</th>
                <th className={styles.header}>Запись создана</th>
                <th className={styles.header}>Последнее обновление</th>
            </thead>
            <tbody className={styles.body}>
                {genres.map((genre) => {
                    return (
                        <tr key={genre.id} className={styles.row}>
                            <td className={styles.cell}>{genre.id}</td>
                            <td className={`${styles.cell} ${styles.cell_name}`}>
                                {genre.name || '-'}
                            </td>
                            <td className={`${styles.cell} ${styles.cell_name}`}>
                                {genre.name_en || '-'}
                            </td>
                            <td
                                className={
                                    styles.cell
                                }>{`${genre.createdAt?.toLocaleDateString()}, ${genre.createdAt?.toLocaleTimeString()}`}</td>
                            <td
                                className={
                                    styles.cell
                                }>{`${genre.updatedAt?.toLocaleDateString()}, ${genre.updatedAt?.toLocaleTimeString()}`}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default AdminGenres;
