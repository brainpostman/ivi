import { useTranslation } from 'next-i18next';
import styles from './FooterSubscribe.module.scss';
import { TiVolumeMute } from 'react-icons/ti';

const FooterSubscribe = () => {
    const { t } = useTranslation('footer', { keyPrefix: 'ad' });
    return (
        <a href='https://www.ivi.ru/subscribe'>
            <div className={styles.container}>
                <div className={styles.icon_container}>
                    <TiVolumeMute className={styles.icon} />
                </div>
                <p className={styles.description}>
                    {t('line-1')}
                    <br />
                    {t('line-2')}
                </p>
            </div>
        </a>
    );
};

export default FooterSubscribe;
