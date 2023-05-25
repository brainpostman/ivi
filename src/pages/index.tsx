import BannerCarousel from '@/components/UI/Carousels/BannerCarousel/BannerCarousel'
import ExpandBlock from '@/components/UI/ExpandBlock/ExpandBlock'
import HomePageInfo from '@/components/HomePageInfo/HomePageInfo'
import TopTenList from '@/components/UI/Carousels/TopTenList/TopTenList'
import LongButton from '@/components/UI/Buttons/LongButton/LongButton'
import PageLayout from '@/layouts/PageLayout/PageLayout'
import { IMovie } from '@/types/api/films.api.interface'
import { GetStaticProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import style from './index.module.scss'
import Loader from '@/components/UI/Loader/Loader'
import { filmsAPI } from '@/api/queries/films.api'
import MovieCarousel from '@/components/UI/Carousels/MovieCarousel/MovieCarousel'

const imgLongButton_1 =
  'https://solea-parent.dfs.ivi.ru/picture/ffffff,ffffff/lightning.svg'

const imgLongButton_2 =
  'https://solea-parent.dfs.ivi.ru/picture/ffffff,ffffff/gift.svg'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const { films } = await filmsAPI.getFilms(locale ?? 'ru', { take: 20 })

  const firstCarouselFilms = films.slice(0, 11)
  const secondCarouselFilms = films.slice(10, 21)

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'ru', [
        'header',
        'auth_modal',
        'home',
        'error',
        'common',
        'footer',
      ])),
      firstCarouselFilms,
      secondCarouselFilms,
    },
  }
}

const VisibleText = () => {
  const { t } = useTranslation('home')

  return <p className={style.visible_text}>{t('visible-text')}</p>
}

interface IProps {
  firstCarouselFilms: IMovie[]
  secondCarouselFilms: IMovie[]
}

const Home: NextPage<IProps> = ({
  firstCarouselFilms,
  secondCarouselFilms,
}) => {
  const { t } = useTranslation('home')

  return (
    <PageLayout title={t('html-title')} description={t('html-description')}>
      <BannerCarousel
        items={t('banner-carousel', { returnObjects: true })}
        speed={800}
      />
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
        <ExpandBlock
          title={t('expand-block-title')}
          visibleBlock={VisibleText()}
        >
          <HomePageInfo />
        </ExpandBlock>
      </div>

      <TopTenList />

      <section className={style.carousels}>
        {firstCarouselFilms ? (
          <MovieCarousel
            title={t('carousel-titles.drama')}
            href='https://www.ivi.ru/collections/dramatical-piece'
            films={firstCarouselFilms}
          />
        ) : (
          <Loader />
        )}

        {secondCarouselFilms ? (
          <MovieCarousel
            title={t('carousel-titles.rus-detective-series')}
            href='https://www.ivi.ru/collections/russkyi-detektiv'
            films={secondCarouselFilms}
          />
        ) : (
          <Loader />
        )}
      </section>
    </PageLayout>
  )
}

export default Home
