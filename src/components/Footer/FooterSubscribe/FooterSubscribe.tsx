import styles from './FooterSubscribe.module.scss';
import { TiVolumeMute } from 'react-icons/ti';

const FooterSubscribe = () => {
    return (
        <a href='https://www.ivi.ru/subscribe'>
            <div className={styles.container}>
                <div className={styles.icon_container}>
                    <TiVolumeMute className={styles.icon} />
                </div>
                <p className={styles.description}>
                    Смотрите фильмы, сериалы и <br /> мультфильмы без рекламы
                </p>
            </div>
        </a>
    );
};

export default FooterSubscribe;
