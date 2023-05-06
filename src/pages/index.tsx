import BannerCarousel from '@/components/BannerCarousel/BannerCarousel'
import CustomCarousel from '@/components/CustomCarousel/CustomCarousel'
import ExpandBlock from '@/components/ExpandBlock/ExpandBlock'
import HomePageInfo from '@/components/HomePageInfo/HomePageInfo'
import MovieCard from '@/components/MovieCard/MovieCard'
import TopTenList from '@/components/TopTenList/TopTenList'
import LongButton from '@/components/UI/LongButton/LongButton'
import ViewAllBlock from '@/components/ViewAllBlock/ViewAllBlock'
import PageLayout from '@/layouts/PageLayout'
import { IMovie } from '@/types/films.api.interface'
import { GetStaticProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import style from './index.module.scss'
import Loader from '@/components/Loader/Loader'
import { filmsAPI } from '@/api/queries/films.api'

const imgLongButton_1 =
  'https://solea-parent.dfs.ivi.ru/picture/ffffff,ffffff/lightning.svg'

const imgLongButton_2 =
  'https://solea-parent.dfs.ivi.ru/picture/ffffff,ffffff/gift.svg'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const { films: firstCarouselFilms } = await filmsAPI.getFilmsHomePage()
  const { films: secondCarouselFilms } = await filmsAPI.getFilmsHomePage({
    page: 2,
  })

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'ru', [
        'header',
        'auth_modal',
        'home',
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
  firstCarouselFilms: IMovie[] | undefined
  secondCarouselFilms: IMovie[] | undefined
}

const breakpoints = [
  { point: 1272, view: 6 },
  { point: 1096, view: 5 },
  { point: 920, view: 4 },
  { point: 744, view: 3 },
  { point: 599, view: 4 },
  { point: 512, view: 3 },
  { point: 392, view: 2 },
]

const Home: NextPage<IProps> = ({
  firstCarouselFilms,
  secondCarouselFilms,
}) => {
  const { t } = useTranslation('home')

  console.log(firstCarouselFilms)

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
          <CustomCarousel
            title={t('carousel-title-1')}
            href='/'
            additElem={<ViewAllBlock />}
            elementsMove={5}
            elementsView={7}
            space={[24, 24]}
            breakpoints={breakpoints}
            classNameList={style.movie_carousel_list}
            padding={6}
            width='fit'
          >
            {firstCarouselFilms.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </CustomCarousel>
        ) : (
          <Loader />
        )}

        {secondCarouselFilms ? (
          <CustomCarousel
            title={t('carousel-title-2')}
            href='/'
            additElem={<ViewAllBlock />}
            elementsMove={5}
            elementsView={7}
            space={[24, 24]}
            breakpoints={breakpoints}
            classNameList={style.movie_carousel_list}
            padding={6}
            width='fit'
          >
            {secondCarouselFilms.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </CustomCarousel>
        ) : (
          <Loader />
        )}
      </section>
    </PageLayout>
  )
}

export default Home
