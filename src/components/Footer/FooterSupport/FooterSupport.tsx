import BasicBtn from '@/components/UI/BasicBtn/BasicBtn';
import styles from './FooterSupport.module.scss';
import { FiPhone } from 'react-icons/fi';
import { GoMail } from 'react-icons/go';
import { useState } from 'react';

const FooterSupport = () => {
    const [showPopUp, setShowPopUp] = useState(false);

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Служба поддержки</h3>
            <div className={styles.description}>
                <p>Мы всегда готовы вам помочь.</p>
                <p>Наши операторы онлайн 24/7</p>
            </div>
            <BasicBtn btnType={'text'} variant={1}>
                <a
                    className={`${styles.link} ${styles.chat}`}
                    href='https://www.ivi.ru/profile'
                    target='_blank'
                    rel='noreferrer'>
                    Написать в чате
                </a>
            </BasicBtn>
            <div className={styles.buttons}>
                <BasicBtn btnType={'icon'} variant={1}>
                    <a href='mailto:support@ivi.ru' className={styles.link}>
                        <GoMail className={styles.icon} />
                    </a>
                </BasicBtn>
                <BasicBtn
                    btnType={'icon'}
                    variant={1}
                    onClick={() => setShowPopUp((prev) => !prev)}
                    className={styles.phone}>
                    <FiPhone className={styles.icon} />
                </BasicBtn>
                <BasicBtn
                    className={`${styles.popup} ${showPopUp ? styles.popup_active : ''}`}
                    btnType={'text'}
                    variant={1}>
                    <a href='tel:+73472588005' rel='nofollow' className={styles.link}>
                        +7 347 258-80-05
                    </a>
                </BasicBtn>
            </div>
            <div className={styles.askivi}>
                <a href='https://ask.ivi.ru/' target='_blank' rel='noreferrer'>
                    ask.ivi.ru
                </a>
                <p>Ответы на вопросы</p>
            </div>
        </div>
    );
};

export default FooterSupport;
