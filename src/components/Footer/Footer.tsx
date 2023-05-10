import { IFooterListItem } from '@/types/IFooterListItem';
import styles from './Footer.module.scss';
import FooterDevices from './FooterDevices/FooterDevices';
import FooterSocials from './FooterSocials/FooterSocials';
import FooterSubscribe from './FooterSubscribe/FooterSubscribe';
import FooterSupport from './FooterSupport/FooterSupport';
import { useTranslation } from 'next-i18next';
import FooterListItem from './FooterListItem/FooterListItem';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { checkAdminRole } from '@/utils/auth.util';

const Footer = () => {
    const { t } = useTranslation('footer');

    const [showLink, setShowLink] = useState(false);

    const { status, data } = useSession();

    useEffect(() => {
        if (status === 'authenticated') {
            checkAdminRole(data.accessToken)
                .then((result) => setShowLink(result))
                .catch((err) => {
                    console.error(err);
                });
            console.log('auth');
        }
        console.log(showLink);
    }, [status]);

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={`${styles.row} ${styles.row_1}`}>
                    <div className={styles.about}>
                        <h3 className={styles.title}>{t('about-us.heading')}</h3>
                        <ul className={styles.list}>
                            {t('about-us.links', { returnObjects: true }).map(
                                (item: IFooterListItem) => (
                                    <FooterListItem item={item} key={item.url} />
                                )
                            )}
                        </ul>
                    </div>
                    <div className={styles.sections}>
                        <h3 className={styles.title}>{t('sections.heading')}</h3>
                        <ul className={styles.list}>
                            {t('sections.links', { returnObjects: true }).map(
                                (item: IFooterListItem) => (
                                    <FooterListItem item={item} key={item.url} />
                                )
                            )}
                        </ul>
                        <p className={styles.activecert}>
                            {showLink ? (
                                <Link href={'/admin'}>{t('administration')}</Link>
                            ) : (
                                <a href={'https://www.ivi.ru/cert'}>{t('cert-activation')}</a>
                            )}
                        </p>
                    </div>
                    <FooterSupport />
                    <FooterSubscribe />
                </div>
                <div className={`${styles.row} ${styles.row_2}`}>
                    <div className={styles.buttons}>
                        <FooterDevices />
                        <FooterSocials />
                    </div>
                    <div>
                        <p
                            className={`${styles.copyright} ${styles.copyright__ivi} ${styles.text}`}>
                            {t('copyright-ivi')}
                        </p>
                        <p
                            className={`${styles.copyright} ${styles.copyright__hbo} ${styles.text}`}>
                            {t('copyright-hbo')}
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
