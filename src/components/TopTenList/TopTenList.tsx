import { topTenListData } from '@/data/topTenList.data'
import Image from 'next/image'
import React from 'react'
import CustomCarousel from '../CustomCarousel/CustomCarousel'
import TopTenListCard from '../TopTenListCard/TopTenListCard'
import style from './TopTenList.module.scss'

const TopTenList: React.FC = () => {
  const time = Date.now()

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.title}>
          <Image
            src='https://solea-parent.dfs.ivi.ru/picture/bypass/top10.svg'
            alt='top10'
            width={116}
            height={28}
          />
          <span>за неделю</span>
        </div>
        <CustomCarousel
          href='/'
          elementsMove={4}
          elementsView={5}
          classNameWrapper={style.carousel_wrapper}
          classNameList={style.carousel_list}
          breakpoints={[1292]}
          width='fit'
        >
          {topTenListData.map((element, index) => (
            <TopTenListCard
              key={time + index}
              id={element.id}
              img={element.img}
              title={element.title}
              index={index}
            />
          ))}
        </CustomCarousel>
      </div>
    </div>
  )
}
export default TopTenList
