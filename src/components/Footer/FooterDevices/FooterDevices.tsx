import BasicBtn from '@/components/UI/BasicBtn/BasicBtn';
import { BiDevices } from 'react-icons/bi';
import { FaApple, FaGooglePlay, FaTv } from 'react-icons/fa';
import styles from './FooterDevices.module.scss';
import { useTranslation } from 'next-i18next';

const FooterDevices = () => {
    const { t } = useTranslation('footer', { keyPrefix: 'devices' });

    return (
        <div className={styles.container}>
            <BasicBtn
                btnType='textPlusIcon'
                href='https://apps.apple.com/RU/app/id455705533'
                title={t('app-store.title')}
                subtitle={t('app-store.subtitle')}>
                <FaApple />
            </BasicBtn>
            <BasicBtn
                btnType='textPlusIcon'
                href='https://play.google.com/store/apps/details?id=ru.ivi.client'
                title={t('google-play.title')}
                subtitle={t('google-play.subtitle')}>
                <FaGooglePlay />
            </BasicBtn>
            <BasicBtn
                btnType='textPlusIcon'
                href='https://www.ivi.ru/pages/tvsmart/'
                title={t('smart-tv.title')}
                subtitle={t('smart-tv.subtitle')}>
                <FaTv />
            </BasicBtn>
            <BasicBtn
                btnType='textPlusIcon'
                href='https://www.ivi.ru/devices'
                title={t('all-devices')}>
                <BiDevices />
            </BasicBtn>
        </div>
    );
};

export default FooterDevices;
