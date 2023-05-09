import BasicLayout from '@/layouts/BasicLayout/BasicLayout';
import FilterBlock from '@/components/FilterBlock/FilterBlock';
import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth/next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect, useRef, useState } from 'react';
import { authOptions } from '../api/auth/[...nextauth]';
import styles from './index.module.scss';
import { checkAdminRole, checkAdminSession, getSerializableSession } from '@/utils/auth.util';
import { Session } from 'next-auth';
import { useRouter } from 'next/router';
import AdminMovie from '@/components/AdminMovie/AdminMovie';
import { ICrudGenre, CrudGenre, ICrudFilm } from '@/types/ICrudMovie';
import Link from 'next/link';
import AdminGenres from '@/components/AdminGenres/AdminGenres';
import { IFilmsGetRequest } from '@/types/films.api.interface';
import { formatFilmsParams } from '@/formatters/filmsParams.format';
import { filmsAPI } from '@/api/queries/films.api';
import { filtersAPI } from '@/api/queries/filters.api';
import { IFilterGetResponse } from '@/types/filters.api.interface';
import { useSession } from 'next-auth/react';
import LanguageSwitcher from '@/components/LanguageSwitcher/LanguageSwitcher';
import Loader from '@/components/Loader/Loader';
import Sort from '@/components/Sort/Sort';

interface IAdminProps {
    authSession: Session;
    defaultFilms: string;
    genres: string;
    filterGenres: IFilterGetResponse[];
    countries: IFilterGetResponse[];
    directors: IFilterGetResponse[];
    actors: IFilterGetResponse[];
    totalCount: number;
}

export const getServerSideProps = async ({
    locale,
    params,
    req,
    res,
}: GetServerSidePropsContext) => {
    const serverSession = await getServerSession(req, res, authOptions);
    const authSession = getSerializableSession(serverSession);
    if (!authSession) {
        return { redirect: { destination: '/auth/signin' } };
    } else if (!(await checkAdminRole(authSession.accessToken))) {
        return { redirect: { destination: '/' } };
    }

    const defaultParams: IFilmsGetRequest = { take: 14, page: 1 };
    const currentParams = { ...formatFilmsParams(params), ...defaultParams };

    const { films, totalCount } = await filmsAPI.getCrudFilms(currentParams);
    const genres = JSON.stringify(await filtersAPI.getCrudGenres());
    const serializedFilms = JSON.stringify(films);
    const filterGenres = await filtersAPI.getGenres(locale ?? 'ru');
    const countries = await filtersAPI.getCountries();
    const directors = await filtersAPI.getDirectors();
    const actors = await filtersAPI.getActors();

    return {
        props: {
            authSession,
            ...(await serverSideTranslations(locale ?? 'ru', ['common', 'admin', 'movies'])),
            defaultFilms: serializedFilms,
            genres,
            filterGenres,
            countries,
            directors,
            actors,
            totalCount,
        },
    };
};

export default function Admin({
    defaultFilms,
    authSession,
    genres,
    filterGenres,
    countries,
    directors,
    actors,
    totalCount,
}: IAdminProps) {
    const { t } = useTranslation('admin');
    const router = useRouter();
    const [chosenTable, setChosenTable] = useState('movies');
    const { status } = useSession();
    const [isLoadedFirstFilms, setIsLoadedFirstFilms] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [totalItems, setTotalItems] = useState(totalCount);
    const [page, setPage] = useState(2);
    const [films, setFilms] = useState<ICrudFilm[]>(JSON.parse(defaultFilms) || []);
    const [crudGenres, setCrudGenres] = useState<ICrudGenre[]>(JSON.parse(genres) || []);
    const scrollFetchTrigger = useRef<HTMLDivElement>(null);
    const observer = useRef<IntersectionObserver>();
    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/auth/signin');
        }
    }, [status]);

    useEffect(() => {
        const interval = window.setInterval(() => {
            if (status === 'authenticated') {
                checkAdminSession(authSession.accessToken);
            }
        }, 300000);
        return () => {
            window.clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        if (isLoading || !isLoadedFirstFilms || chosenTable !== 'movies') return;
        if (observer.current) {
            observer.current.disconnect();
        }
        const callback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
            if (entries[0].isIntersecting && films.length < totalCount) {
                setIsLoading(true);
            }
        };
        observer.current = new IntersectionObserver(callback);
        observer.current.observe(scrollFetchTrigger.current!);
    }, [isLoading]);

    const getFilmsWithParams = () => {
        setPage(page + 1);

        const defaultParams: IFilmsGetRequest = { take: 14, page };
        const currentParams = {
            ...formatFilmsParams(router.query),
            ...defaultParams,
        };

        filmsAPI
            .getCrudFilms(currentParams)
            .then(({ films, totalCount }) => {
                setFilms((prev) => [...prev, ...films]);
                setTotalItems(totalCount);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    useEffect(() => {
        if (!defaultFilms || isLoadedFirstFilms) return;

        setIsLoadedFirstFilms(true);
        setIsLoading(false);
    }, [defaultFilms]);

    useEffect(() => {
        if (chosenTable === 'movies') {
            if (!isLoading || !isLoadedFirstFilms) return;

            getFilmsWithParams();
        } else {
            if (!isLoading) return;

            filtersAPI
                .getCrudGenres()
                .then((genres) => {
                    if (genres.length > 0) {
                        setCrudGenres(genres);
                    }
                })
                .finally(() => setIsLoading(false));
        }
    }, [isLoading]);

    useEffect(() => {
        router.push('/admin', undefined, { shallow: true });
    }, [chosenTable]);

    useEffect(() => {
        if (!router.query || !isLoadedFirstFilms || isLoading) return;

        setPage(1);
        setFilms([]);
        setIsLoading(true);
    }, [router.query]);

    return (
        <BasicLayout title={t('html-title')}>
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    <div></div>
                    <h1 className={styles.title}>Administration</h1>
                    <LanguageSwitcher />
                </div>
                <div className={styles.db}>
                    <section className={styles.db__input}>
                        <h2 className={styles.heading__page}>Controls</h2>
                        <article>
                            {chosenTable === 'movies' && (
                                <>
                                    {' '}
                                    {!!Object.keys(router.query).length && <Sort />}
                                    <FilterBlock
                                        countries={countries}
                                        genres={filterGenres}
                                        directors={directors}
                                        actors={actors}
                                        className={styles.filters}
                                    />
                                </>
                            )}
                        </article>
                    </section>
                    <section className={styles.db__output}>
                        <div className={styles.heading}>
                            <div className={styles.heading__container}>
                                <div className={styles.heading__pages}>
                                    <h2
                                        className={`${styles.heading__page} ${
                                            chosenTable === 'movies'
                                                ? styles.heading__page_active
                                                : ''
                                        }`}
                                        onClick={() => {
                                            setChosenTable('movies');
                                        }}>
                                        Movies
                                    </h2>
                                    <h2
                                        className={`${styles.heading__page} ${
                                            chosenTable === 'genres'
                                                ? styles.heading__page_active
                                                : ''
                                        }`}
                                        onClick={() => {
                                            setChosenTable('genres');
                                        }}>
                                        Genres
                                    </h2>
                                </div>
                                <Link href={'/'}>
                                    <h2 className={styles.heading__page}>Home</h2>
                                </Link>
                            </div>
                        </div>
                        <div className={styles.database}>
                            {chosenTable === 'movies' && (
                                <div className={styles.database__movies}>
                                    {films.map((film) => {
                                        return (
                                            <AdminMovie
                                                className={styles.database__movie}
                                                key={film.id}
                                                movie={film}
                                            />
                                        );
                                    })}
                                    <div
                                        className={styles.scrolltrigger}
                                        ref={scrollFetchTrigger}></div>
                                    {isLoading && <Loader />}
                                </div>
                            )}
                            {chosenTable === 'genres' &&
                                (isLoading ? (
                                    <Loader />
                                ) : (
                                    <AdminGenres setLoading={setIsLoading} genres={crudGenres} />
                                ))}
                        </div>
                    </section>
                </div>
            </div>
        </BasicLayout>
    );
}
