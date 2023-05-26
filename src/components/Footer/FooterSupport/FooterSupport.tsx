import BasicBtn from '@/components/UI/Buttons/BasicBtn/BasicBtn';
import { useRef, useState } from 'react';
import { FiPhone } from 'react-icons/fi';
import { GoMail } from 'react-icons/go';
import styles from './FooterSupport.module.scss';
import { useTranslation } from 'next-i18next';
import useOutside from '@/hooks/useOutside';

const FooterSupport = () => {
    const [showPopUp, setShowPopUp] = useState(false);
    const popupRef = useRef<HTMLDivElement>(null);
    const { t } = useTranslation('footer', { keyPrefix: 'support' });
    useOutside(popupRef, () => setShowPopUp(false), showPopUp);
    return (
        <div className={styles.container}>
            <h3 className={styles.title}>{t('support-service')}</h3>
            <div className={styles.description}>
                <p>{t('we-ready')}</p>
                <p>{t('online-24-7')}</p>
            </div>
            <BasicBtn btnType='text' href='https://www.ivi.ru/profile'>
                {t('chat')}
            </BasicBtn>
            <div className={styles.buttons}>
                <BasicBtn btnType='icon' href='mailto:support@ivi.ru'>
                    <GoMail />
                </BasicBtn>
                <div className={styles.call} ref={popupRef}>
                    <BasicBtn btnType='icon' onClick={() => setShowPopUp((prev) => !prev)}>
                        <FiPhone />
                    </BasicBtn>
                    <div
                        className={`${
                            showPopUp ? styles.popup__wrapper__active : styles.popup__wrapper
                        }`}>
                        <BasicBtn
                            className={`${styles.popup} ${showPopUp ? styles.popupActive : ''}`}
                            href='tel:+78442459825'
                            btnType='text'>
                            +7 347 258-80-05
                        </BasicBtn>
                    </div>
                </div>
            </div>
            <div className={styles.askivi}>
                <a href='https://ask.ivi.ru/' target='_blank' rel='noreferrer'>
                    ask.ivi.ru
                </a>
                <p>{t('qna')}</p>
            </div>
        </div>
    );
};

export default FooterSupport;
