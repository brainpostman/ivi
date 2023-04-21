import { useEffect, useRef, useState } from 'react';
import styles from './AuthModal.module.scss';
import { useTypedDispatch } from '@/hooks/ReduxHooks';
import { setAuthModal } from '../../store/reducers/authModalReducer';

interface IAuthModalProps {
    modalShown: boolean;
}

const AuthModal = ({ modalShown }: IAuthModalProps) => {
    const [progressBar, setProgressBar] = useState(5);
    const dispatch = useTypedDispatch();
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (modalRef.current) {
            modalRef.current.style.top = window.scrollY + 'px';
        }
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [modalShown]);

    return (
        <div className={styles.modal} ref={modalRef}>
            <section className={styles.header}>
                <div className={styles.header__container}>
                    <div></div>
                    <h2 className={styles.header__title}>Вход или регистрация</h2>
                    <div
                        className={styles.close}
                        onClick={() => dispatch(setAuthModal(false))}></div>
                </div>
                <div
                    className={styles.header__progressBar}
                    style={{
                        width: `${progressBar}%`,
                    }}></div>
            </section>
        </div>
    );
};

export default AuthModal;
