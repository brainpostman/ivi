import { useEffect, useState } from 'react';
import styles from './AuthModal.module.scss';
import { RiCloseFill } from 'react-icons/ri';

interface IAuthModalProps {
    modalShown: boolean;
    closeModal: () => void;
}

const AuthModal = ({ modalShown, closeModal }: IAuthModalProps) => {
    const [progressBar, setProgressBar] = useState(5);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [modalShown]);

    return (
        <>
            {modalShown && (
                <div className={styles.modal}>
                    <section className={styles.header}>
                        <div className={styles.header__container}>
                            <div></div>
                            <h2 className={styles.header__title}>Вход или регистрация</h2>
                            <div className={styles.close} onClick={() => closeModal()}></div>
                        </div>
                        <div
                            className={styles.header__progressBar}
                            style={{
                                width: `${progressBar}%`,
                            }}></div>
                    </section>
                </div>
            )}
        </>
    );
};

export default AuthModal;
