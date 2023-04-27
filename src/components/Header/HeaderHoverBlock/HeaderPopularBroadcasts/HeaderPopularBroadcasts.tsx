import CustomCarousel from '@/components/CustomCarousel/CustomCarousel'
import { headerPopularBroadcastsData } from '@/data/headerTVBlock.data'
import Image from 'next/image'
import styleParent from '../HeaderHoverBlock.module.scss'
import style from './HeaderPopularBroadcasts.module.scss'

const HeaderPopularBroadCasts = () => {
  return (
    <div>
      <p className={styleParent.title}>Популярные трансляции</p>

      <CustomCarousel
        elementsView={2}
        elementsMove={2}
        space={16}
        arrowSize={16}
        width='fit-shadow'
      >
        {headerPopularBroadcastsData.map(broadcast => (
          <div className={style.wrapper}>
            <Image src={broadcast.img} alt='broadcast' width={58} height={38} />
            <div className={style.info}>
              <p className={style.title}>{broadcast.title}</p>
              <p className={style.info__bottom}>
                <span>{broadcast.date}</span> •{' '}
                <span>{broadcast.category}</span>
              </p>
            </div>
          </div>
        ))}
      </CustomCarousel>
    </div>
  )
}

export default HeaderPopularBroadCasts
