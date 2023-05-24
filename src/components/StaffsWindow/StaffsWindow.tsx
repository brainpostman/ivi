import Image from 'next/image';
import style from './StaffsWindow.module.scss';
import { IMovieById } from '@/types/films.api.interface';
import { FC } from 'react';
import StaffCard from '../StaffCard/StaffCard';
import Link from 'next/link';
import ModalFilmPoster from '../ModalFilmPoster/ModalFilmPoster';
import { useTranslation } from 'next-i18next';

interface IProps {
    film: IMovieById;
}

const StaffsWindow: FC<IProps> = ({ film }) => {
    const { t } = useTranslation('watch', { keyPrefix: 'watch-actors.staffs-window' });
    const staffs = [
        { title: t('directors'), list: film.directors },
        { title: t('actors'), list: film.actors },
        { title: t('operators'), list: film.operators },
        { title: t('artists'), list: film.artists },
        { title: t('writers'), list: film.scenario },
        { title: t('editors'), list: film.compositors },
    ];

    return (
        <div className={style.wrapper} onClick={(e) => e.stopPropagation()}>
            <div className={style.modal_conteiner}>
                <div className={style.modal_info}>
                    <div className={style.modal_info_title}>
                        {film.name}: {t('actors-n-creators')}
                    </div>
                    <ul className={style.staff_grid_outer}>
                        {staffs.map(
                            (staffCard, index) =>
                                !!staffCard.list.length && (
                                    <li key={index}>
                                        <h3 className={style.modal_info_subtitle}>
                                            {staffCard.title}
                                        </h3>
                                        <ul className={style.staff_grid}>
                                            {staffCard.list.map((staff) => (
                                                <li key={staff.id}>
                                                    <Link href={`/person/${staff.id}`}>
                                                        <StaffCard staff={staff} />
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                )
                        )}
                    </ul>
                </div>

                <ModalFilmPoster film={film} />
            </div>
        </div>
    );
};

export default StaffsWindow;
