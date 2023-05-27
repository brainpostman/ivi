import CustomCarousel from '@/components/UI/Carousels/CustomCarousel/CustomCarousel'
import Image from 'next/image'
import styleParent from '../HeaderHoverBlock.module.scss'
import style from './HeaderPopularBroadcasts.module.scss'
import { useTranslation } from 'next-i18next'

const HeaderPopularBroadCasts = () => {
  const { t } = useTranslation('header', { keyPrefix: 'left-side.tv-block' })
  return (
    <div>
      <p className={styleParent.title}>{t('popular-broadcasts-title')}</p>

      <CustomCarousel
        elementsView={2}
        elementsMove={2}
        space={[16, 16]}
        arrowSize={16}
        width='fit-shadow'
      >
        {t('popular-broadcasts', { returnObjects: true }).map(broadcast => (
          <div key={broadcast.title} className={style.wrapper}>
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
