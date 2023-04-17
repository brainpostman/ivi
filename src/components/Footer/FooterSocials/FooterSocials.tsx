import BasicBtn from '@/components/UI/BasicBtn/BasicBtn';
import styles from './FooterSocials.module.scss';
import {
    FaVk,
    FaOdnoklassniki,
    FaTwitter,
    FaViber,
    FaLinkedinIn,
    FaTelegramPlane,
} from 'react-icons/fa';

const FooterSocials = () => {
    return (
        <div className={styles.container}>
            <a href='https://vk.com/iviru' target='_blank' rel='noreferrer'>
                <BasicBtn btnType={'icon'} variant={2}>
                    <FaVk className={styles.icon} />
                </BasicBtn>
            </a>
            <a href='https://ok.ru/ivi.ru' target='_blank' rel='noreferrer'>
                <BasicBtn btnType={'icon'} variant={2}>
                    <FaOdnoklassniki className={styles.icon} />
                </BasicBtn>
            </a>
            <a href='https://twitter.com/ivi_ru' target='_blank' rel='noreferrer'>
                <BasicBtn btnType={'icon'} variant={2}>
                    <FaTwitter className={styles.icon} />
                </BasicBtn>
            </a>
            <a href='https://vb.me/a0544c' target='_blank' rel='noreferrer'>
                <BasicBtn btnType={'icon'} variant={2}>
                    <FaViber className={styles.icon} />
                </BasicBtn>
            </a>
            <a href='https://www.linkedin.com/company/2543415/' target='_blank' rel='noreferrer'>
                <BasicBtn btnType={'icon'} variant={2}>
                    <FaLinkedinIn className={styles.icon} />
                </BasicBtn>
            </a>
            <a href='https://t.me/official_iviru' target='_blank' rel='noreferrer'>
                <BasicBtn btnType={'icon'} variant={2}>
                    <FaTelegramPlane className={styles.icon} />
                </BasicBtn>
            </a>
        </div>
    );
};

export default FooterSocials;
