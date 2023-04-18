import styles from './Footer.module.scss';
import FooterDevices from './FooterDevices/FooterDevices';
import FooterSocials from './FooterSocials/FooterSocials';
import FooterSubscribe from './FooterSubscribe/FooterSubscribe';
import FooterSupport from './FooterSupport/FooterSupport';
import about from '../../data/Footer/footerAbout';
import sections from '../../data/Footer/footerSections';
import List from '../UI/List/List';
import { IFooterListItem } from '@/types/IFooterListItem';
import FooterListItem from './FooterListItem/FooterListItem';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={`${styles.row} ${styles.row_1}`}>
                    <div className={styles.about}>
                        <h3 className={styles.title}>О нас</h3>
                        <List
                            items={about}
                            renderItem={(item: IFooterListItem) => {
                                return <FooterListItem item={item} />;
                            }}
                            className={styles.list}
                        />
                    </div>
                    <div className={styles.sections}>
                        <h3 className={styles.title}>Разделы</h3>
                        <List
                            items={sections}
                            renderItem={(item: IFooterListItem) => {
                                return <FooterListItem item={item} />;
                            }}
                            className={styles.list}
                        />
                        <p className={styles.activecert}>
                            <a href={'https://www.ivi.ru/cert'}>Активация сертификата</a>
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
                            © 2023 ООО «Иви.ру»
                        </p>
                        <p
                            className={`${styles.copyright} ${styles.copyright__hbo} ${styles.text}`}>
                            HBO ® and related service marks are the property of Home Box Office, Inc
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
