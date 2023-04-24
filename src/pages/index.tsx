import HomePageInfo from '@/components/HomePageInfo/HomePageInfo';
import BannerCarousel from '@/components/BannerCarousel/BannerCarousel';
import MovieCarousel from '@/components/MovieCarousel/MovieCarousel';
import TopTenList from '@/components/TopTenList/TopTenList';
import LongButton from '@/components/UI/LongButton/LongButton';
import mainCarouselData from '@/data/banner_carousel/bannerCarouselData';
import { movieCarouselData } from '@/data/movieCarousel.data';
import PageLayout from '@/layouts/PageLayout';
import style from './index.module.scss';

const title =
    'Онлайн-кинотеатр Иви - фильмы, сериалы и мультфильмы смотреть онлайн бесплатно в хорошем качестве';

const description =
    'Устройте кинотеатр у себя дома! Смотрите онлайн фильмы хорошего качества в приятной домашней обстановке и в удобное для вас время. Для вас всегда доступны бесплатные фильмы без регистрации на любой вкус: сериалы, фильмы, мультфильмы и многое другое.';

const imgLongButton_1 = 'https://solea-parent.dfs.ivi.ru/picture/ffffff,ffffff/lightning.svg';

const imgLongButton_2 = 'https://solea-parent.dfs.ivi.ru/picture/ffffff,ffffff/gift.svg';

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
            <HomePageInfo />
            <TopTenList />

            <section className={style.carousels}>
                <MovieCarousel title='Добрые мультсериалы' movieList={movieCarouselData} href='/' />
                <MovieCarousel title='Поймать преступника' movieList={movieCarouselData} href='/' />
            </section>
        </PageLayout>
    );
}
