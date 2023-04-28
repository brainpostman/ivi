import BannerCarousel from '@/components/BannerCarousel/BannerCarousel';
import CustomCarousel from '@/components/CustomCarousel/CustomCarousel';
import ExpandBlock from '@/components/ExpandBlock/ExpandBlock';
import HomePageInfo from '@/components/HomePageInfo/HomePageInfo';
import MovieCard from '@/components/MovieCard/MovieCard';
import TopTenList from '@/components/TopTenList/TopTenList';
import LongButton from '@/components/UI/LongButton/LongButton';
import ViewAllBlock from '@/components/ViewAllBlock/ViewAllBlock';
import mainCarouselData from '@/data/banner_carousel/bannerCarouselData';
import { movieCardGridData } from '@/data/movieCard.data';
import PageLayout from '@/layouts/PageLayout';
import style from './index.module.scss';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const title =
    'Онлайн-кинотеатр Иви - фильмы, сериалы и мультфильмы смотреть онлайн бесплатно в хорошем качестве';

const description =
    'Устройте кинотеатр у себя дома! Смотрите онлайн фильмы хорошего качества в приятной домашней обстановке и в удобное для вас время. Для вас всегда доступны бесплатные фильмы без регистрации на любой вкус: сериалы, фильмы, мультфильмы и многое другое.';

const imgLongButton_1 = 'https://solea-parent.dfs.ivi.ru/picture/ffffff,ffffff/lightning.svg';

const imgLongButton_2 = 'https://solea-parent.dfs.ivi.ru/picture/ffffff,ffffff/gift.svg';

const infoTitle =
    'Онлайн-кинотеатр Иви: фильмы в хорошем качестве всегда приносят настоящее удовольствие';

const VisibleText = () => {
    return (
        <p className={style.visible_text}>
            Каждый день миллионы людей ищут фильмы онлайн, и никто не хочет усложнять себе жизнь – и
            вы наверняка один из них! А раз так, то Иви – это именно тот ресурс, который вам нужен.
            От лучших кинолент в HD-качестве вас отделяет буквально один клик. Мы не просто
            освобождаем от необходимости идти в кинотеатр или изучать программу телепередач – у
            посетителей нашего ресурса гораздо больше возможностей.
        </p>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale ?? 'ru', ['header', 'auth_modal'])),
            // Will be passed to the page component as props
        },
    };
};

export default function Home() {
    return (
        <PageLayout title={title} description={description}>
            <BannerCarousel items={mainCarouselData} speed={800} />

            <div className={style.buttons}>
                <a href='https://www.ivi.ru/subscribe?redirect_url=%2F'>
                    <LongButton variant='secondary' img={imgLongButton_1}>
                        30 дней подписки за 1 ₽
                    </LongButton>
                </a>
                <a href='https://www.ivi.ru/login?action=%2Fuser%2Fcertificate&redirect_url=%2F'>
                    <LongButton variant='primary' img={imgLongButton_2}>
                        Активировать сертификат
                    </LongButton>
                </a>
            </div>

            <div className={style.wrapper_expand}>
                <ExpandBlock title={infoTitle} visibleBlock={VisibleText()}>
                    <HomePageInfo />
                </ExpandBlock>
            </div>

            <TopTenList />

            <section className={style.carousels}>
                <CustomCarousel
                    title='Добрые мультфильмы'
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
                    title='Добрые мультфильмы'
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
