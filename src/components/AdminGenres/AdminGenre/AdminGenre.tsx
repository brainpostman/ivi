import { ICrudGenre } from '@/types/ICrudMovie';
import parentStyles from '../AdminGenres.module.scss';
import { AiFillCheckCircle } from 'react-icons/ai';
import { GiCancel } from 'react-icons/gi';
import styles from './AdminGenre.module.scss';
import { Dispatch, SetStateAction, useState } from 'react';
import { customAxios } from '@/api/queries/customAxios';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

interface IAdminGenreProps {
    genre: ICrudGenre;
    setLoading: Dispatch<SetStateAction<boolean>>;
}

const AdminGenres = ({ genre, setLoading }: IAdminGenreProps) => {
    const createdAt = new Date(genre.createdAt);
    const updatedAt = new Date(genre.updatedAt);
    const { data } = useSession();
    const router = useRouter();
    const [name, setName] = useState(genre.name);
    const [engName, setEngName] = useState(genre.name_en);

    const handleFieldChanges = async () => {
        if (name !== genre.name || engName !== genre.name_en) {
            const newGenre = { ...genre, name: name, name_en: engName };
            console.log(newGenre);
            try {
                const response = await customAxios.put('/genre-update', newGenre, {
                    headers: {
                        Authorization: `Bearer ${data?.accessToken ?? ''}`,
                    },
                });
                setLoading(true);
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
        <tr key={genre.id} className={parentStyles.row}>
            <td className={parentStyles.cell}>{genre.id}</td>
            <td className={`${parentStyles.cell} ${parentStyles.cell_name}`}>
                <input
                    type='text'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={styles.input}
                />
            </td>
            <td className={`${parentStyles.cell} ${parentStyles.cell_name}`}>
                <input
                    type='text'
                    value={engName}
                    onChange={(e) => setEngName(e.target.value)}
                    className={styles.input}
                />
            </td>
            <td
                className={
                    parentStyles.cell
                }>{`${createdAt.toLocaleDateString()}, ${createdAt.toLocaleTimeString()}`}</td>
            <td
                className={
                    parentStyles.cell
                }>{`${updatedAt.toLocaleDateString()}, ${updatedAt.toLocaleTimeString()}`}</td>
            <td className={parentStyles.cell}>
                <AiFillCheckCircle
                    className={`${styles.icon} ${styles.check}`}
                    onClick={() => handleFieldChanges()}
                    title='Сохранить изменения'
                />
            </td>
            <td className={parentStyles.cell}>
                <GiCancel
                    className={`${styles.icon} ${styles.cancel}`}
                    onClick={() => {
                        setName(genre.name);
                        setEngName(genre.name_en);
                    }}
                    title='Отменить изменения'
                />
            </td>
        </tr>
    );
};

export default AdminGenres;
