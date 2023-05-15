import BasicBtn from '@/components/UI/BasicBtn/BasicBtn'
import { useTranslation } from 'next-i18next'
import { BiDevices } from 'react-icons/bi'
import { FaApple, FaGooglePlay, FaTv } from 'react-icons/fa'
import styles from './FooterDevices.module.scss'

const FooterDevices = () => {
  const { t } = useTranslation('footer', { keyPrefix: 'devices' })

  return (
    <div className={styles.container}>
      <BasicBtn
        btnType='icon'
        href='https://apps.apple.com/RU/app/id455705533'
        title={t('app-store.title')}
        suptitle={t('app-store.subtitle')}
      >
        <FaApple />
      </BasicBtn>
      <BasicBtn
        btnType='icon'
        href='https://play.google.com/store/apps/details?id=ru.ivi.client'
        title={t('google-play.title')}
        suptitle={t('google-play.subtitle')}
      >
        <FaGooglePlay />
      </BasicBtn>
      <BasicBtn
        btnType='icon'
        href='https://www.ivi.ru/pages/tvsmart/'
        title={t('smart-tv.title')}
        suptitle={t('smart-tv.subtitle')}
      >
        <FaTv />
      </BasicBtn>
      <BasicBtn
        btnType='icon'
        href='https://www.ivi.ru/devices'
        title={t('all-devices')}
      >
        <BiDevices />
      </BasicBtn>
    </div>
  )
}

export default FooterDevices
