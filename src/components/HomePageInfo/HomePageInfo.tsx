import { useTranslation } from 'next-i18next';
import style from './HomePageInfo.module.scss';

const HomePageInfo = () => {
    const { t } = useTranslation('home');

    return (
        <>
            <div>{t('home-page-info.intro')}</div>

            <div className={style.list}>
                <p>{t('home-page-info.bullet-points-title')}</p>
                <ul className={style.list__content}>
                    {t('home-page-info.bullet-points', { returnObjects: true }).map((info) => (
                        <li key={info}>{info}</li>
                    ))}
                </ul>
            </div>
            <p>{t('home-page-info.conclusion')}</p>
        </>
    );
};

export default HomePageInfo;
