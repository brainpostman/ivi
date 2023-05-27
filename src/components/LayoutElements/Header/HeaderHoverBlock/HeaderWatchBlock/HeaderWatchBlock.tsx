import HighlightButton from '@/components/UI/Buttons/HighlightButton/HighlightButton'
import { AiOutlineFolderAdd } from 'react-icons/ai'
import { BiCameraMovie } from 'react-icons/bi'
import { BsDownload } from 'react-icons/bs'
import { CiBullhorn } from 'react-icons/ci'
import { MdSupervisorAccount } from 'react-icons/md'
import style from './HeaderWatchBlock.module.scss'
import { useTranslation } from 'next-i18next'

const HeaderWatchBlock = () => {
  const { t } = useTranslation('header', {
    keyPrefix: 'right-side.watch-block',
  })
  return (
    <div>
      <div className={style.info}>
        <h1 className={style.info__title}>{t('ivi-sub')}</h1>
        <p className={style.info__subtitle}>{t('sub-price')}</p>
      </div>

      <ul className={style.list}>
        <li>
          <BiCameraMovie />
          <p>{t('new-releases')}</p>
        </li>
        <li>
          <AiOutlineFolderAdd />
          <p>{t('weekly-addition')}</p>
        </li>
        <li>
          <CiBullhorn />
          <p>{t('no-ads')}</p>
        </li>
        <li>
          <MdSupervisorAccount />
          <p>{t('for-5-devices')}</p>
        </li>
        <li>
          <BsDownload />
          <p>{t('mobile-app')}</p>
        </li>
      </ul>

      <div className={style.bottom_content}>
        <HighlightButton className={style.bottom_content__button}>
          {t('watch-30-days')}
        </HighlightButton>
        <p className={style.bottom_content__info}>{t('cancel-any-time')}</p>
      </div>
    </div>
  )
}

export default HeaderWatchBlock
