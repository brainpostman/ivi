import BasicBtn from '@/components/UI/Buttons/BasicBtn/BasicBtn'
import HeaderChannels from '../HeaderChannels/HeaderChannels'
import HeaderPopularBroadCasts from '../HeaderPopularBroadcasts/HeaderPopularBroadcasts'
import style from './HeaderTvBlock.module.scss'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'

const HeaderTvBlock = () => {
  const { t } = useTranslation('header', { keyPrefix: 'left-side.tv-block' })

  return (
    <div className={style.wrapper}>
      {/*LEFT SIDE*/}
      <div className={style.left_side}>
        <ul className={style.list}>
          {t('list-tv', { returnObjects: true }).map(el => (
            <li key={el.title}>
              <Link href={el.href} className='text'>
                {el.title}
              </Link>
            </li>
          ))}
        </ul>

        <BasicBtn
          className={style.tv_program_btn}
          href='https://www.ivi.ru/tvplus/tv-schedule-today'
        >
          {t('tv-schedule')}
        </BasicBtn>
      </div>

      {/*MIDDLE SIDE*/}
      <div className={style.middle_side}>
        <HeaderChannels />
        <HeaderPopularBroadCasts />
      </div>
    </div>
  )
}

export default HeaderTvBlock
