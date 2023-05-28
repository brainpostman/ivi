import Image from 'next/image'
import React from 'react'
import CustomCarousel from '../CustomCarousel/CustomCarousel'
import TopTenListCard from '../../Cards/TopTenListCard/TopTenListCard'
import style from './TopTenList.module.scss'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { FC } from 'react'
import Link from 'next/link'
import { IMovie } from '@/types/api/films.api.interface'

interface IProps {
  className?: string
  topTenFilms: IMovie[]
}

const TopTenList: FC<IProps> = ({ className = '', topTenFilms }) => {
  const { t } = useTranslation('home')
  const { locale } = useRouter()

  return (
    <div className={`${style.wrapper} ${className}`}>
      <div className={style.container}>
        <Link href={'/movies?scoreAVG=1&orderBy=scoreAVG&order=DESC'}>
          <div className={style.title}>
            {locale === 'ru' ? (
              <Image
                src='https://solea-parent.dfs.ivi.ru/picture/bypass/top10.svg'
                alt='top10'
                width={116}
                height={28}
              />
            ) : (
              <p>{t('top-10')}</p>
            )}
            <p>{t('this-week')}</p>
          </div>
        </Link>
        <CustomCarousel
          href='/'
          elementsMove={4}
          elementsView={5}
          classNameList={style.carousel_list}
          breakpoints={[
            { point: 1161, view: 4 },
            { point: 881, view: 3 },
            { point: 599, view: 2 },
          ]}
          padding={16}
          width='fit'
        >
          {topTenFilms.map((film, index) => (
            <TopTenListCard key={index} film={film} index={index} />
          ))}
        </CustomCarousel>
      </div>
    </div>
  )
}
export default TopTenList
