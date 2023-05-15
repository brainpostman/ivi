import { ICRUDGenre } from '@/types/ICrudMovie';
import styles from './AdminGenres.module.scss';
import AdminGenre from './AdminGenre/AdminGenre';
import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'next-i18next';

interface IAdminGenres {
    genres: ICRUDGenre[];
    setLoading: Dispatch<SetStateAction<boolean>>;
}

const AdminGenres = ({ genres, setLoading }: IAdminGenres) => {
    const { t } = useTranslation('admin', { keyPrefix: 'admin-genre' });
    return (
        <table className={styles.table}>
            <thead className={styles.header}>
                <tr>
                    <th className={styles.cell}>ID</th>
                    <th className={styles.cell}>{t('name')}</th>
                    <th className={styles.cell}>{t('name-eng')}</th>
                    <th className={styles.cell}>{t('created-at')}</th>
                    <th className={styles.cell}>{t('updated-at')}</th>
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
