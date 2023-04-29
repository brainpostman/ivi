import CustomCarousel from '@/components/CustomCarousel/CustomCarousel';
import ExpandBlock from '@/components/ExpandBlock/ExpandBlock';
import FilterBlock from '@/components/FilterBlock/FilterBlock';
import MovieCardGrid from '@/components/MovieCardGrid/MovieCardGrid';
import Sort from '@/components/Sort/Sort';
import ViewMoreButton from '@/components/UI/ViewMoreButton/ViewMoreButton';
import VioletButton from '@/components/UI/VioletButton/VioletButton';
import { movieCardGridData } from '@/data/movieCard.data';
import PageLayout from '@/layouts/PageLayout';
import { useRouter } from 'next/router';
import { useState } from 'react';
import style from './index.module.scss';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale ?? 'ru', [
                'header',
                'auth_modal',
                'common',
                'footer',
                'movies',
            ])),
        },
    };
};

const MoviesPage = () => {
    const router = useRouter();
    const { t } = useTranslation('movies');
    const [isClickedViewMode, setIsClickedViewMore] = useState(false);

    const onClickViewMore = () => {
        setIsClickedViewMore(true);
    };

    const currentMovies = isClickedViewMode ? movieCardGridData : movieCardGridData.slice(0, 35);

    return (
        <PageLayout title={t('html-title')}>
            <section className={style.wrapper}>
                {/*BREAD CRUMBS*/}
                <h1 className={style.title}>{t('heading')}</h1>
                <ExpandBlock visibleBlock={t('movie-page-info', { returnObjects: true })[0]}>
                    <div className={style.info}>
                        {t('movie-page-info', { returnObjects: true })
                            .slice(1)
                            .map((info, index) => (
                                <p key={index}>{info}</p>
                            ))}
                    </div>
                </ExpandBlock>
                <CustomCarousel
                    elementsView={8}
                    elementsMove={2}
                    arrowSize={16}
                    classNameWrapper={style.carousel_wrapper}
                    space={[12, 12]}>
                    {t('filter-categories', { returnObjects: true }).map((filter) => (
                        <VioletButton key={filter}>{filter}</VioletButton>
                    ))}
                </CustomCarousel>
                {!!Object.keys(router.query).length && <Sort />}
                <FilterBlock />
                <div className={style.moviegrid_wrapper}>
                    <MovieCardGrid movies={currentMovies} className={style.moviegrid_container} />
                    {!isClickedViewMode && <ViewMoreButton onClick={onClickViewMore} />}
                </div>
            </section>
        </PageLayout>
    );
};

export default MoviesPage;
