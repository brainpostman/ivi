import BasicLayout from '@/layouts/BasicLayout/BasicLayout';
import axios from 'axios';
import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth/next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect } from 'react';
import { authOptions } from '../api/auth/[...nextauth]';
import styles from './index.module.scss';
import { checkAdminRole, getSerializableSession } from '@/utils/auth.util';
import { Session } from 'next-auth';
import { useRouter } from 'next/router';
import AdminMovie from '@/components/AdminMovie/AdminMovie';
import movie from '../../data/movie.json';
import { Movie } from '@/types/ICrudMovie';
import Link from 'next/link';

interface IAdminProps {
    authSession: Session;
}

export const getServerSideProps = async ({ locale, req, res }: GetServerSidePropsContext) => {
    const serverSession = await getServerSession(req, res, authOptions);
    const authSession = getSerializableSession(serverSession);
    if (!authSession || !(await checkAdminRole(authSession.accessToken))) {
        return { redirect: { destination: '/' } };
    }

    return {
        props: {
            authSession,
            ...(await serverSideTranslations(locale ?? 'ru', ['common', 'admin'])),
        },
    };
};

export default function Admin({ authSession }: IAdminProps) {
    const { t } = useTranslation('admin');
    const router = useRouter();

    useEffect(() => {
        if (!authSession) {
            router.push('/');
        }
    }, [authSession]);

    return (
        <BasicLayout title={t('html-title')}>
            <div className={styles.wrapper}>
                <h1 className={styles.title}>Administration</h1>
                <div className={styles.db}>
                    <section className={styles.db__input}>
                        <h2 className={styles.header__page}>Controls</h2>
                        <article></article>
                    </section>
                    <section className={styles.db__output}>
                        <div className={styles.header}>
                            <div className={styles.header__container}>
                                <div className={styles.header__pages}>
                                    <h2
                                        className={`${styles.header__page} ${styles.header__page_active}`}>
                                        Movies
                                    </h2>
                                    <h2 className={styles.header__page}>Genres</h2>
                                </div>
                                <Link href={'/'}>
                                    <h2 className={styles.header__page}>Home</h2>
                                </Link>
                            </div>
                        </div>
                        <div className={styles.database}>
                            <AdminMovie movie={new Movie(movie)} />
                            <button
                                onClick={async () => {
                                    await axios
                                        .get(
                                            'http://188.120.248.77/films?order=ASC&take=20&orderBy=name&genres=%D0%B1%D0%BE%D0%B5%D0%B2%D0%B8%D0%BA'
                                        )
                                        .then((resp) => {
                                            console.log(resp);
                                        });
                                }}>
                                here
                            </button>
                        </div>
                    </section>
                </div>
            </div>
        </BasicLayout>
    );
}
