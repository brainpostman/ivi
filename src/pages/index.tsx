import BannerCarousel from '@/components/BannerCarousel/BannerCarousel';
import CustomCarousel from '@/components/CustomCarousel/CustomCarousel';
import ExpandBlock from '@/components/ExpandBlock/ExpandBlock';
import HomePageInfo from '@/components/HomePageInfo/HomePageInfo';
import MovieCard from '@/components/MovieCard/MovieCard';
import TopTenList from '@/components/TopTenList/TopTenList';
import LongButton from '@/components/UI/LongButton/LongButton';
import ViewAllBlock from '@/components/ViewAllBlock/ViewAllBlock';
import { movieCardGridData } from '@/data/movieCard.data';
import PageLayout from '@/layouts/PageLayout/PageLayout';
import style from './index.module.scss';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

const imgLongButton_1 = 'https://solea-parent.dfs.ivi.ru/picture/ffffff,ffffff/lightning.svg';

const imgLongButton_2 = 'https://solea-parent.dfs.ivi.ru/picture/ffffff,ffffff/gift.svg';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale ?? 'ru', [
                'header',
                'auth_modal',
                'home',
                'common',
                'footer',
            ])),
        },
    };
};

const VisibleText = () => {
    const { t } = useTranslation('home');

    return <p className={style.visible_text}>{t('visible-text')}</p>;
};

export default function Home() {
    const { t } = useTranslation('home');

    return (
        <PageLayout title={t('html-title')} description={t('html-description')}>
            <BannerCarousel items={t('banner-carousel', { returnObjects: true })} speed={800} />
            <div className={style.buttons}>
                <a href='https://www.ivi.ru/subscribe?redirect_url=%2F'>
                    <LongButton variant='secondary' img={imgLongButton_1}>
                        {t('30-day-sub')}
                    </LongButton>
                </a>
                <a href='https://www.ivi.ru/login?action=%2Fuser%2Fcertificate&redirect_url=%2F'>
                    <LongButton variant='primary' img={imgLongButton_2}>
                        {t('activate-cert')}
                    </LongButton>
                </a>
            </div>

            <div className={style.wrapper_expand}>
                <ExpandBlock title={t('expand-block-title')} visibleBlock={VisibleText()}>
                    <HomePageInfo />
                </ExpandBlock>
            </div>

            <TopTenList />

            <section className={style.carousels}>
                <CustomCarousel
                    title={t('carousel-title-1')}
                    href='/'
                    additElem={ViewAllBlock}
                    elementsMove={5}
                    elementsView={7}
                    breakpoints={[1274, 1078, 900, 767, 550]}
                    space={[24, 4]}
                    padding={6}
                    width='fit'>
                    {movieCardGridData.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </CustomCarousel>

                <CustomCarousel
                    title={t('carousel-title-2')}
                    href='/'
                    additElem={ViewAllBlock}
                    elementsMove={5}
                    elementsView={7}
                    breakpoints={[1274, 1078, 900, 767, 550]}
                    space={[24, 4]}
                    padding={6}
                    width='fit'>
                    {movieCardGridData.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </CustomCarousel>
            </section>
        </PageLayout>
    );
}
